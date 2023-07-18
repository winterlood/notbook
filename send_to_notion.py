import requests
import json
import os
import sys

is_success = len(sys.argv) == 2 and sys.argv[1] == "success"
history_page_id = os.getenv("NOTION_HISTORY_ID")

success_json = {
    "parent": { "database_id": history_page_id },
    "icon": { "emoji": "✅" },
    "properties": {
        "Name": {
            "title": [
                {
                    "text": {
                        "content": "Success"
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
                        "content": "Fail"
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

headers = {'Authorization': 'Bearer secret_dhSwU4iZBw2y4qzz6kUCiSaIPTFDhlDSIaBB3bBr1Il',"Content-Type": "application/json", "Notion-Version": "2022-06-28"}
res = requests.post("https://api.notion.com/v1/pages", headers=headers, data=json.dumps(result_json))

print(res.status_code)
