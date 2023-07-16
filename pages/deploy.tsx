import { Alert, Button, styled } from "@mui/material";
import { useState } from "react";


const Wrapper = styled("div") ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "white"
});

const user = process.env.GIT_USER;
const repo = process.env.REPO_NAME;
const token = process.env.GITHUB_TOKEN;
const workflow_id = process.env.WORKFLOW_ID;

console.log(user, repo);

export default function Deploy() {

    const [status, setStatus] = useState(true);

    const onClick = async () => {
        setStatus(false);

        const response = await fetch(`https://api.github.com/repos/${user}/${repo}/actions/workflows/${workflow_id}/dispatches`, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Accept": "application/vnd.github+json",
              "Authorization": `Bearer ${token}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                "ref":"main"
            }), // body data type must match "Content-Type" header
          });

        response.json().then((data) => {
            if (data.length == 0) {
                alert("success");
            }
            else {
                alert(data.message);
            }
            console.log("data", data)
        }).catch((err) => {
            console.log("err", err)
        }).finally(() => {
            setStatus(true);
        })

    }

    return (
        <Wrapper>
            <Button variant="contained" color="primary" disabled={!status} onClick={onClick}>Deploy</Button>
        </Wrapper>
    );
}
