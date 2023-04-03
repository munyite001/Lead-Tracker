let myLeads = localStorage.getItem("leads") == null ? [] : JSON.parse(localStorage.getItem('leads'))
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById('delete-btn');
const saveTab = document.getElementById('tab-btn')

renderLeads();

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("leads",JSON.stringify(myLeads));
    renderLeads()
})

deleteBtn.addEventListener('click', () => {
    myLeads = []
    localStorage.clear();
    renderLeads();
})

saveTab.addEventListener('click', ()=>{
    chrome.tabs.query({active: true, currentWindow: true},(tabs) => {
        myLeads.push(tabs[0].url);
        localStorage.setItem("leads", JSON.stringify(myLeads));
        renderLeads();
    })
})

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}
