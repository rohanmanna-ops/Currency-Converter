// const base_url="https://2024-03-06.currency-api.pages.dev/v1/currencies"
const base_url="https://apilayer.net/api/live?access_key=c5604b329edfa41c0f482502c0d76dd5&currencies=INR&source=USD&format=1"

let dropdown=document.querySelectorAll('.drop_down select')
let newbutton=document.querySelector('form button')
let fromButton=document.querySelector('.from select')
let toButton=document.querySelector('.to select')
let amt=document.querySelector('.amount input')
let msg=document.querySelector('.msg')
msg.innerText= "<---Result--->"
msg.style.color="lightblue"

function setmsg(val,amt,fromcurrency,tocurrency){
    msg.style.color="red"
    msg.innerText= `${amt} ${fromcurrency} => ${val*amt} ${tocurrency}`

}


for (let select of dropdown){               // select of is used because of **{document.queryselectorAll}
    for (let ccode in countryList ){
        let code_option=document.createElement('option')
        code_option.innerText=ccode
        code_option.value=ccode     // code_option.setAttribute('value',ccode) (or you can use this)
        if (code_option.innerText==='USD' && select.name==='from'){
            code_option.selected='selected'
        }
        else if (code_option.innerText==='INR' && select.name==='to'){
            code_option.selected='selected'
        }
       
        select.append(code_option)
    }
    
    select.addEventListener('change',(evt)=>{
        updateflag(evt.target)                  // for wherever change occurs  (evt event object )

    })

}

const updateflag = (element)=>{
    let currCode=element.value
    let contryCode=countryList[currCode]
    let imgLink=`https://flagsapi.com/${contryCode}/flat/64.png`

    // this code is replaced by just two line below.
    // if (element.name==='from'){
    //     let img=document.querySelector('.from img')
    //     img.src=imgLink
    // }
    // else{
    //     let img=document.querySelector('.to img')
    //     img.src=imgLink
    // }

    let img = element.parentElement.querySelector('img')
    img.src=imgLink
}

newbutton.addEventListener('click',async (evt)=>{
    evt.preventDefault();
    let amtval=amt.value
    if (amtval===''|| amtval<1){
        amt.value=1
    }
    fromcurrency=fromButton.value
    tocurrency=toButton.value

    let url=`https://apilayer.net/api/live?access_key=c5604b329edfa41c0f482502c0d76dd5&currencies=${tocurrency}&source=${fromcurrency}&format=1`
    msg.innerText='Pls Wait ...'
    msg.style.color='blue'
    let response= await fetch(url)
    let data=await response.json()

    add=fromcurrency+tocurrency
    add=String(add)
    val=data.quotes[add]
    // console.log(val)
    setmsg(val,amt.value,fromcurrency,tocurrency)

})


