#!/usr/bin/env python

import os
import requests

PROJECT_ID = os.environ["CI_PROJECT_ID"]
MR_IID = os.environ["CI_MERGE_REQUEST_IID"]
TOKEN = os.environ["MR_COMMENT"]

headers = {f"Private-Token": TOKEN}
mr_url = f"https://git.bink.com/api/v4/projects/{PROJECT_ID}/merge_requests/{MR_IID}"
mr_notes_url = f"https://git.bink.com/api/v4/projects/{PROJECT_ID}/merge_requests/{MR_IID}/notes"

mr_info = requests.get(mr_url, headers=headers).json()

mr_created_time = mr_info['created_at']
content = f"MR Deployed\n\nWasabi: https://web.dev.gb.bink.com/mr-{MR_IID}/wasabi/"

comments = requests.get(mr_notes_url, headers=headers).json()
posted_comment = any(["MR Deployed" in comment.get('body', '') for comment in comments])

if not posted_comment:
    requests.post(mr_notes_url, headers=headers, params={
        'body': content,
        # 'created_at': mr_created_time
    })

