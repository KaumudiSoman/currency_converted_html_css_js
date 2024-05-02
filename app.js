const dropdowns = document.querySelectorAll(".currency-opt select")
const btn = document.querySelector("#btn")
const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-22/v1/currencies"
const fromCurr = document.querySelector("#from")
const toCurr = document.querySelector("#to")
const result = document.querySelector("#result")

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        select.append(newOption)
    }

    select.addEventListener('change', (evt) => {
        updateFlags(evt.target)
    })
}

updateFlags = (element) => {
    currCode = element.value
    countryCode = countryList[currCode]
    let flag = element.parentElement.querySelector('img')
    flag.src = `https://flagsapi.com/${countryCode}/flat/64.png`
}

getExchangeRate = async () => {
    let amount = document.querySelector('input')
    let amountVal = amount.value

    url = `${base_url}/${fromCurr.value.toLowerCase()}.json`

    let response = await fetch(url)
    let data = await response.json()

    rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]

    finalAmt = amountVal * rate

    result.innerText = `${amountVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
}

btn.addEventListener('click', (evt) => {
    evt.preventDefault()

    getExchangeRate()
})
