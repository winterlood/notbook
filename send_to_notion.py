import requests
import json
import os
import sys

if len(sys.argv) != 3:
    sys.exit()

is_success = sys.argv[1] == "success"
history_page_id = os.getenv("NOTION_HISTORY_ID")
notion_api_key = os.getenv("NOTION_API_KEY")
run_number = sys.argv[2]
print(len(notion_api_key))
print(len(history_page_id))

success_json = {
    "parent": { "database_id": history_page_id },
    "icon": { "emoji": "✅" },
    "properties": {
        "Name": {
            "title": [
                {
                    "text": {
                        "content": "Github Action #" + run_number
                    }
                }
            ]
        },
        "Status": {
            "select": {
                "name": "Success"
            }
        }
    }
}

fail_json = {
    "parent": { "database_id": history_page_id },
    "icon": { "emoji": "🚫" },
    "properties": {
        "Name": {
            "title": [
                {
                    "text": {
                        "content": "Github Action #" + run_number
                    }
                }
            ]
        },
        "Status": {
            "select": {
                "name": "Fail"
            }
        }
    },
    "children": [
        {
			"object": "block",
			"type": "paragraph",
			"paragraph": {               
                "rich_text": [
                    {
                        "type": "mention",
                        "mention": {
                            "type": "user",
                            "user": {
                                "object": "user",
                                "id": "c5af877f-cef5-4a04-8c19-73ce4ca72264"
                            }
                        }
                    },
                    {
                        "type": "text",
                        "text": {
                            "content": " show this!"
                        }
                    }
                ]
            }
		}
	]
}

result_json = success_json if is_success else fail_json

headers = {'Authorization': 'Bearer ' + notion_api_key,"Content-Type": "application/json", "Notion-Version": "2022-06-28"}
res = requests.post("https://api.notion.com/v1/pages", headers=headers, data=json.dumps(result_json))

result_code = res.status_code
print(result_code)
if result_code != 200:
    print(res.json())
