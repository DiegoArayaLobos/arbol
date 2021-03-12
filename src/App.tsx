import { useState, useRef, ChangeEvent } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { AppStyled, Button } from "./globalStyles";

const App = () => {
    const [jsonThree, setJsonThree] = useState<string>("");
    const [jsonFiles, setJsonFiles] = useState<string>("");

    const hiddenFileInput = useRef<HTMLInputElement>(document.createElement("input"));

    const handleClick = (): void => {
        hiddenFileInput.current.click();
    };

    const onReaderLoad = (event: ProgressEvent): void => {
        const target = event.target as FileReader;
        const jsonObj = JSON.parse(target.result as string);
        let three: string = ``;
        Object.keys(jsonObj).forEach((jsonLevel1: string) => {
            three = `${jsonLevel1}`;
            Object.keys(jsonObj[jsonLevel1]).forEach((jsonLevel2: string) => {
                three = `${three}\n├──${jsonLevel2}`;
                Object.keys(jsonObj[jsonLevel1][jsonLevel2]).forEach((jsonLevel3: string, index: number) => {
                    if (jsonObj[jsonLevel1][jsonLevel2].length - 1 === index) {
                        three = `${three}\n│   └──${jsonObj[jsonLevel1][jsonLevel2][jsonLevel3]}`;
                    } else {
                        three = `${three}\n│   ├──${jsonObj[jsonLevel1][jsonLevel2][jsonLevel3]}`;
                    }
                });
            });
        });
        three = `${three}\n╹`;
        setJsonThree(three);
        setJsonFiles(jsonObj);
    };

    const handleChange = (event: ChangeEvent): void => {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];

        if (file !== undefined) {
            const reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsText(file);
        }
    };

    const downloadFile = (): void => {
        if (jsonFiles !== "") {
            let root: string = "";
            let folders: Array<string> = [];
            let zip = new JSZip();

            Object.keys(jsonFiles).forEach((rootName: string) => (root = rootName));

            Object.values(jsonFiles).forEach((rootName: string) => {
                Object.keys(rootName).forEach((folderName: string) => (folders = [...folders, folderName]));
            });

            Object.values(jsonFiles).forEach((rootName: string) => {
                Object.values(rootName).forEach((folderName: string, index: number) => {
                    Object.values(folderName).forEach((subFolderName: string) => {
                        zip.file(`${root}/${folders[index]}/${subFolderName}/index.tsx`, `export { default } from "./${subFolderName}";`);
                        zip.file(`${root}/${folders[index]}/${subFolderName}/${subFolderName}.tsx`, `import { ${subFolderName}Styled } from "./${subFolderName}Styled";\n\nconst ${subFolderName} = () => {\n    return(\n        <>\n            <${subFolderName}></${subFolderName}>\n        </>\n    );\n}\n\nexport default ${subFolderName};`);
                        zip.file(`${root}/${folders[index]}/${subFolderName}/${subFolderName}Styled.tsx`, `import styled from "styled-components";\n\nexport const ${subFolderName}Styled = styled.div\`\n\`;`);
                    });
                });
            });

            zip.generateAsync({ type: "blob" }).then(function (content) {
                saveAs(content, "components.zip");
            });
        }
    };

    return (
        <>
            <AppStyled>
                <div className="leftPanel">
                    <div className="title">
                        <span>Árbol</span>
                    </div>
                    <div className="containerForm">
                        <div className="inputForm">
                            <Button onClick={handleClick}>Seleccione el archivo JSON</Button>
                            <input type="file" accept="application/JSON" ref={hiddenFileInput} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="rightPanel">
                    <div className="containerJSON">
                        <pre>{jsonThree}</pre>
                    </div>
                    <div className="download" onClick={downloadFile}>
                        <Button>Descargar el arbol de archivos</Button>
                    </div>
                </div>
            </AppStyled>
        </>
    );
};

export default App;
