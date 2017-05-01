chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'loading') return


    chrome.tabs.executeScript(tabId, {
        code: 'var injected = window.simprInjected; window.simprInjected = true; injected;',
        runAt: 'document_start'
    }, (res) => {
        // don't continue if error (i.e. page isn't in permission list) OR value of `injected` above: don't inject twice
        if (chrome.runtime.lastError || res[0]) {
            return;
        }

        chrome.pageAction.show(tabId);

        chrome.tabs.insertCSS(tabId, { file: 'simpr.css', runAt: 'document_start' });
        chrome.tabs.executeScript(tabId, { file: 'simpr.js', runAt: 'document_start' });
    })
});
