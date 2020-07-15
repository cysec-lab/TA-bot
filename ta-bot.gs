// 参考：https://qiita.com/pchan52/items/574e930a3cc42cf7f8b9#2-slack%E3%81%AEwebhook%E3%81%AEtoken%E3%81%AE%E7%99%BA%E8%A1%8C

function sendToSlack(body, channel) 
  var url = "<Slackのincoming-webhook URL>; //Slackのincoming-webhook URL
  var data = { "channel" : channel, "username" : "TA対応情報bot", "text" : body, "icon_url" : "https://2.bp.blogspot.com/-W1DO9_IC3a4/WxvKIr4Pe4I/AAAAAAABMnE/0zTo5-67rdATvQxxejwcnbBP72bDQ38PQCLcBGAs/s800/job_telephone_operator_woman_majime.png"};
  var payload = JSON.stringify(data);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var response = UrlFetchApp.fetch(url, options);
}

function test() {
  sendToSlack("テスト通知確認です", "#experiment-ta");
}

function onFormSubmit(e){

  var body = "<TA対応情報が更新されました>"; 
  var applicant = "";
  var itemResponse = e.response.getItemResponses();

  for (var j = 0; j < itemResponse.length; j++){    
    var formData = itemResponse[j];
    var title = formData.getItem().getTitle();
    var response = formData.getResponse();

    switch (title) {
      case "カテゴリ":
        category = response;
        break;
      case "質問内容":
        question = response;
        break;
      case "ステータス":
        status = response;
        break;
      default:
        break;
    }
  }
  if (status == "未解決"){
    body = body + " <!channel>";
  }
  body = body + "\n";
  
  var bodyPublic =  body + "*カテゴリ*　 " + category + "\n*質問内容*　 " + question + "\n*ステータス* " + status;

  sendToSlack(bodyPublic, "#experiment-ta");
  //sendToSlack(bodyPublic, "#sandbox");
}