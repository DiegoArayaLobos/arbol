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
                        if (folders[index] === 'layout' && folderName.includes("Sidebar") && folderName.includes("Navbar") || folders[index] === 'layout' && folderName.includes("Sidebar") && !folderName.includes("Navbar")) {
                            if (subFolderName === 'Sidebar') {
                                zip.file(`${root}/layout/Sidebar/index.tsx`, indexCreate('Sidebar'));
                                zip.file(`${root}/layout/Sidebar/Sidebar.tsx`, menuCreate(rootName, 'Sidebar'));
                                zip.file(`${root}/layout/Sidebar/SidebarStyled.tsx`,   componentStyledCreate('Sidebar'));
                            }
                            if (subFolderName === 'Navbar') {
                                zip.file(`${root}/${folders[index]}/${subFolderName}/index.tsx`, indexCreate(subFolderName));
                                zip.file(`${root}/${folders[index]}/${subFolderName}/${subFolderName}.tsx`, componentCreate(subFolderName));
                                zip.file(`${root}/${folders[index]}/${subFolderName}/${subFolderName}Styled.tsx`, componentStyledCreate(subFolderName));
                            }
                        } else if (folders[index] === 'layout' && folderName.includes("Navbar") && !folderName.includes("Sidebar")) {
                            zip.file(`${root}/layout/Navbar/index.tsx`, indexCreate('Navbar'));
                            zip.file(`${root}/layout/Navbar/Navbar.tsx`, menuCreate(rootName, 'Navbar'));
                            zip.file(`${root}/layout/Navbar/NavbarStyled.tsx`,   componentStyledCreate('Navbar'));
                        } else if (folders[index] === 'route' && folderName.includes("Public") && folderName.includes("Private") || folders[index] === 'route' && !folderName.includes("Public") && folderName.includes("Private")) {
                            if (subFolderName === "Private") {
                                zip.file(`${root}/route/Private/index.tsx`, indexCreate('Private'));
                                zip.file(`${root}/route/Private/Private.tsx`, routeCreate(rootName, "Private"));
                            }
                            if (subFolderName === "Public") {
                                zip.file(`${root}/route/Public/index.tsx`, indexCreate("Public"));
                                zip.file(`${root}/route/Public/Public.tsx`, publicRouteCreate("Public"));
                            }
                        } else if (folders[index] === 'route' && folderName.includes("Public") && !folderName.includes("Private")) {
                            zip.file(`${root}/route/Public/index.tsx`, indexCreate('Public'));
                            zip.file(`${root}/route/Public/Public.tsx`, routeCreate(rootName, "Public"));
                        } else {
                            zip.file(`${root}/${folders[index]}/${subFolderName}/index.tsx`, indexCreate(subFolderName));
                            zip.file(`${root}/${folders[index]}/${subFolderName}/${subFolderName}.tsx`, componentCreate(subFolderName));
                            zip.file(`${root}/${folders[index]}/${subFolderName}/${subFolderName}Styled.tsx`, componentStyledCreate(subFolderName));
                        }
                    });
                });
            });

            zip.file(`README.md`, jsonThree);

            zip.generateAsync({ type: "blob" }).then(function (content) {
                saveAs(content, "components.zip");
            });
        }
    };

    const indexCreate = (nameComponent: string): string => {
        return `export { default } from "./${nameComponent}";`;
    }

    const componentCreate = (nameComponent: string): string => {
        return `import { ${nameComponent}Styled } from "./${nameComponent}Styled";\n\nconst ${nameComponent} = () => {\n    return(\n        <>\n            <${nameComponent}Styled></${nameComponent}Styled>\n        </>\n    );\n}\n\nexport default ${nameComponent};`;
    }

    const publicRouteCreate = (nameComponent: string): string => {
        return `const ${nameComponent} = () => {\n    return(\n        <></>\n    );\n}\n\nexport default ${nameComponent};`;
    }

    const componentStyledCreate = (nameComponent: string): string => {
        return `import styled from "styled-components";\n\nexport const ${nameComponent}Styled = styled.div\`\n\`;`;
    }

    const menuCreate = (folders: string, folder: string): string => {
        var indexs: Array<number> = Object.values(folders).map((e: string, i: number) => Object.values(e).map((subFolder: string) => subFolder.includes("Root"))[0] ? i : -1).filter((e: number) => e !== -1);

        const elementArray = indexs.map((index: number) => {
            let conditional: Array<boolean> = [];
            Object.values(Object.keys(folders)[index]).map((letter: string) => {
                conditional = [...conditional, /^[A-Z]+$/.test(letter)];
            })
            let path: string = '';
            let label: string = '';
            if (conditional.includes(true)) {
                conditional.forEach((condition: boolean, indexCondition: number) => {
                    if (condition === true) {
                        path = `${path}-${Object.values(Object.keys(folders)[index])[indexCondition].toLowerCase()}`;
                        label = `${label} ${Object.values(Object.keys(folders)[index])[indexCondition]}`;
                    } else {
                        path = path + Object.values(Object.keys(folders)[index])[indexCondition];
                        if (indexCondition === 0) {
                            label = label + Object.values(Object.keys(folders)[index])[indexCondition].toUpperCase();
                        } else {
                            label = label + Object.values(Object.keys(folders)[index])[indexCondition];
                        }
                    }
                })
                return {
                    path: path,
                    label: label
                };
            } else {   
                return {
                    path: Object.keys(folders)[index],
                    label: Object.keys(folders)[index][0].toUpperCase() + Object.keys(folders)[index].slice(1)
                };
            }
        });

        return `import { NavLink } from 'react-router-dom';\nimport { ${folder}Styled } from "./${folder}Styled";\n\nconst ${folder} = () => {\n    return(\n        <>\n            <${folder}Styled>\n                <nav>${elementArray.map((element: { path: string; label: string; }): string => `\n                    <NavLink to="${element.path}">${element.label}</NavLink>`).join("")}\n                </nav>\n            </${folder}Styled>\n        </>\n    );\n}\n\nexport default ${folder};`;
    }

    const routeCreate = (folders: string, component: string): string => {
        var indexs: Array<number> = Object.values(folders).map((e: string, i: number) => Object.values(e).map((subFolder: string) => subFolder.includes("Root"))[0] ? i : -1).filter((e: number) => e !== -1);

        const elementArray = indexs.map((index: number) => {
            let conditional: Array<boolean> = [];
            Object.values(Object.keys(folders)[index]).map((letter: string) => {
                conditional = [...conditional, /^[A-Z]+$/.test(letter)];
            })
            let path: string = '';
            if (conditional.includes(true)) {
                conditional.forEach((condition: boolean, indexCondition: number) => {
                    if (condition === true) {
                        path = `${path}-${Object.values(Object.keys(folders)[index])[indexCondition].toLowerCase()}`;
                    } else {
                        path = path + Object.values(Object.keys(folders)[index])[indexCondition];
                    }    
                })
                return {
                    path: path,
                    component: Object.keys(folders)[index]
                };
            } else {   
                return {
                    path: Object.keys(folders)[index],
                    component: Object.keys(folders)[index]
                };
            }
        });

        return `import { BrowserRouter, Switch, Route } from "react-router-dom";${elementArray.map((element: { path: string; component: string; }): string => `\nimport ${element.component} from "../../${element.component}/${element.component[0].toUpperCase()}${element.component.slice(1)}Root";`).join("")}\n\nconst ${component} = () => {\n    return(\n        <>\n            <BrowserRouter>\n                <Switch>${elementArray.map((element: { path: string; component: string; }): string => `\n                    <Route exact path="/${element.path}" component={${element.component}} />`).join("")}\n                </Switch>\n            </BrowserRouter>\n        </>\n    );\n}\n\nexport default ${component};`;
    }

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
