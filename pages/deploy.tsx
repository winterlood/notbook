import { Alert, Button, TextField, styled } from "@mui/material";
import { useState } from "react";

const Wrapper = styled("div")<{success: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh !important;
    width: 100% !important;
    background-color: white;
    /* background-color: ${(props: any) => props.success ? "lightgreen" : "red"}; */
`

const ButtonWrapper = styled(Button) ({
    marginLeft: "20px",
    marginBottom: "20px"
})

const user = process.env.GIT_USER;
const repo = process.env.REPO_NAME;
const workflow_id = process.env.WORKFLOW_ID;

export default function Deploy() {

    const [token, setToken] = useState("");
    const [success, setSuccess] = useState(true);
    const [message, setMessage] = useState(" ");

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
                setSuccess(true);
                setMessage("success");
            }
            else {
                setSuccess(false);
                setMessage(JSON.parse(data)["message"]);
            }
        }).catch((err) => {
            setSuccess(false);
            setMessage(err);
        });

    }

    return (
        <Wrapper success={success}>
            <TextField id="outlined-basic" label="TOKEN" variant="outlined" value={token} onChange={onChange}  error={!success} helperText={message}/>
            <ButtonWrapper variant="contained" color="primary" disabled={token.length == 0} onClick={onClick} >Deploy</ButtonWrapper>
        </Wrapper>
    );
}
