const beautify = require('js-beautify').js;
const fs = require("fs")
const { JSDOM } = require('jsdom');
;(async () => {
    await jsonToJS(require("./code.json"), 2, true)
    // console.log(await jsonToJS(require("./code.json"), 2))
    // console.log(await xmlToJS(fs.readFileSync("./code.xml", "utf8")))
})()

/**
 * 
 * @param {object} data JSON 코드
 * @param {number} tab 들여쓰기 취향 
 * @param {boolean?} run 이 코드를 실행할까요
 * @returns JS코드
 * JSON으로 짠 코드를 JS로 변환해줍니다
 */
async function jsonToJS(data, tab, run) {
    const result = []
    for await (const item of data) {
        result.push(realJsonToJS(item))
    }
    const code = beautify(result.join("\n"), { indent_size: tab, space_in_empty_paren: true })
    if (run) return eval(code)
    else return code
    function realJsonToJS(data) {
        const res = []
        switch (data.name) {
            case "print": {
                addCode(`console.log(${data.arguments.value.map(v => `\`${v}\``).join(", ")});`)
                break
            }
            case "loop": {
                addCode(`for (let ${data.arguments.variable} = ${data.arguments.start}; ${data.arguments.variable} < ${data.arguments.end}; ${data.arguments.variable}++) {`)
                for (const item of data.run) {
                    addCode(realJsonToJS(item))
                }
                addCode(`}`)
                break
            }
            case "memo": {
                addCode(`// ${data.value}`)
                break
            }
            case "variable": {
                if (typeof data.value !== "string")
                    addCode(`${data.type} ${data.id} = ${data.value.value}`)
                else
                    addCode(`${data.type} ${data.id} = \`${data.value}\``)
                break
            }
            case "js": {
                addCode(data.value)
                break
            }
        }
        function addCode(code) {
            res.push(/*`${new Array(tab * 4).fill(" ").join("")}*/`${code}`) 
        }
        return res.join("\n")
    }
}
async function xmlToJS(RWData) {
    const json = []
    async function RealXmlConverter(data) {
        const dom = new JSDOM()
        const parser = new dom.window.DOMParser();
        const xmlDoc = parser.parseFromString(`${data}`, 'text/xml');

        const newRoot = xmlDoc.createElement('rt');

        const children = xmlDoc.getElementById("root").children;
        for await (const child of children) {
            if (child.nodeType === xmlDoc.ELEMENT_NODE) {
                const newWrapper = xmlDoc.createElement('elem')
                newWrapper.setAttribute("name", child.nodeName)
                for (const item of child.attributes)
                    newWrapper.setAttribute(item.name, item.value)
                if (child.children.length > 0) {
                    for await (const item of child.children) {
                        // console.log(child.nodeName, " => ", item.nodeName, " | ", item.outerHTML.trim())
                        newWrapper.appendChild(await RealXmlConverter(`<root id="root">${item.outerHTML}</root>`))
                    }
                }
                else {
                    // console.log(child.innerHTML)
                    newWrapper.innerHTML = child.innerHTML
                }
                newRoot.appendChild(newWrapper)
            }
        }
        return dom.window.document.body.appendChild(newRoot)
    }
    await toJson(await RealXmlConverter(`<root id="root">${RWData}</root>`))
    async function toJson(convertedXml) {
        for await (const child of convertedXml.children) {
            json.push(realToJson(child))
        }
        function realToJson(data) {
            const item = {
                name: data.getAttribute("name")
            }
            switch (data.getAttribute("name")) {
                case "print":
                    item.value = data.innerText
                    break;
                case "loop":
                    item.arguments = {
                        variable: data.getAttribute("var"),
                        start: data.getAttribute("start"),
                        end: data.getAttribute("end")
                    }
                    for (const child of data.getElementsByTagName("rt")[0].children) {
                        item.run = realToJson(child)
                    }
                    break;
                case "memo":
                    item.value = data.getAttribute("value")
                    break;
                case "variable":
                    item.type = data.getAttribute("type")
                    item.id = data.getAttribute("id")
                    item.value = data.innerText
                    break;
            }
            return item
        }
    }
    return jsonToJS(json)
    console.log(JSON.stringify(json))
}