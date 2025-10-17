let redirectEnabled = true;

chrome.storage.sync.get(["redirectEnabled", "redirectUrl"], (data)=>{
  if(redirectEnabled !== undefined) redirectEnabled = data.redirectEnabled;
  if(redirectUrl) applyRedirectRule(data.redirectUrl)
});

chrome.storage.onChanged.addListener((changes, area)=>{
  if(area == "sync"){
    if(changes.redirectEnabled){
      redirectEnabled = changes.redirectEnabled.newValue;
      console.log(`Redirect Enabled: ${redirectEnabled}`)
    }
    if(changes.redirectUrl){
      applyRedirectRule(changes.redirectUrl.newValue)
    }
  }
})

function applyRedirectRule(toUrl){
  if(!toUrl) return;

  chrome.declarativeNetRequest.updateDynamicRule({
    removeRuleIds : [1],
    addRules: [{
       id: 1,
       priority: 1,
       action:{
        type: "redirect",
        redirect:{ url: toUrl}
       },
       condition:{
        urlFilter: "youtube.com",
        resourceTypes: ["main_frame"]
       }
    }]
  })
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info)=>{
  if(redirectEnabled) console.log("Redirect triggered:", info)
})