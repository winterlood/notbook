import { Alert, Button, TextField, styled } from "@mui/material";
import { useState } from "react";


const Wrapper = styled("div") ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "white"
});

const ButtonWrapper = styled(Button) ({
    marginLeft: "20px"
})

const user = process.env.GIT_USER;
const repo = process.env.REPO_NAME;
const workflow_id = process.env.WORKFLOW_ID;

export default function Deploy() {

    const [token, setToken] = useState("");

    const onChange = (e: React.ChangeEvent) => {
        setToken((e.target as any).value);
    }

    const onClick = async () => {
        setToken("");

        const response = await fetch(`https://api.github.com/repos/${user}/${repo}/actions/workflows/${workflow_id}/dispatches`, {
            method: "POST",
            headers: {
              "Accept": "application/vnd.github+json",
              "Authorization": `Bearer ${token}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
            body: JSON.stringify({
                "ref":"main"
            }), // body data type must match "Content-Type" header
          });

        response.text().then((data) => {
            console.log("result", data)
            if (data.length == 0) {
                alert("success");
            }
            else {
                alert(JSON.parse(data)["message"]);
            }
        }).catch((err) => {
            console.log("err", err)
        });

    }

    return (
        <Wrapper>
            <TextField id="outlined-basic" label="TOKEN" variant="outlined" value={token} onChange={onChange} />
            <ButtonWrapper variant="contained" color="primary" disabled={token.length == 0} onClick={onClick} >Deploy</ButtonWrapper>
        </Wrapper>
    );
}
