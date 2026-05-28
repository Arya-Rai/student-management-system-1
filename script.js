let regForm = document.querySelector(".register-form");
let allInput = regForm.querySelectorAll("INPUT");
let allBtn = regForm.querySelectorAll("BUTTON");
let classBtn = document.querySelector(".btn-close");
let regList = document.querySelector(".reg-list");
let addBtn = document.querySelector(".add-btn");
let searchEl = document.querySelector(".search");
let delAllBtn = document.querySelector(".delete-all-btn");

let allRegData = [];

 if(localStorage.getItem("allRegData")!= null)
{
    allRegData = JSON.parse(localStorage.getItem("allRegData"));
}
regForm.onsubmit = (e) => {
    e.preventDefault();
    let checkEmail = allRegData.find((data) => data.Email == allInput[2].value);
    if(checkEmail == undefined)
    {
        allRegData.push({
        Name : allInput[0].value,
        Enrollment : allInput[1].value,
        Email : allInput[2].value,
        Mobile : allInput[3].value,
        Branch : allInput[4].value,
        Year : allInput[5].value,
    });
    localStorage.setItem("allRegData",JSON.stringify(allRegData));
    swal("data Inserted" , "successfully!","success");
    closeBtn.click();
    regForm.reset('');
    getRegData();
    }
    else
    {
        swal("Email alreay exists","failed","warning");
    }
}
const getRegData = () => {
    regList.innerHTML = "";

    allRegData.forEach((data,index) => {
        let dataStr = JSON.stringify(data);
        let finalData = dataStr.replace(/"/g,"'");
        regList.innerHTML += `
<tr>
    <td>1</td>
    <td>${data.Name}</td>
    <td>${data.Enrollment}</td>
    <td>${data.Email}</td>
    <td>${data.Mobile}</td>
    <td>${data.Branch}</td>
    <td>${data.Year}</td>
    <td>
        <button data="${finalData}" index=${index}" class="edit-btn btn btn-primary">
            <i class="fa fa-edit"></i>
        </button>
        <button index="${index}" class=" del-btn btn btn-danger">
            <i class="fa fa-trash"></i>
        </button>
    </td>
</tr>




        `;
    });
    action();
}

// delete coding
const action = () =>{
    let allDelBtn = regList.querySelectorAll(".del-btn");
    for(let btn of  allDelBtn)
    {    

        btn.onclick = async () =>{
   
            let isconfirm =  await confirm();
            if(isconfirm)
            {
                let index =  btn.getAttribute("index");
                allRegData.splice(index,1);
                localStorage.setItem("allRegData",JSON.stringify(allRegData));
                getRegData();
            }
        }
   

    }

    // update coding
    let allEditBtn = regList.querySelectorAll(".edit-btn");
    for(let btn of allEditBtn)
    {
        btn.onclick = () => {
            let index = btn.getAttribute("index");
            let dataStr = btn.getAttribute("data");
            let finalData = dataStr.replace(/'/g,'"');
            let data = JSON.parse(finalData);

            addBtn.click();
            allInput[0].value = data.Name;
            allInput[1].value = data.Enrollment;
            allInput[2].value = data.Email;
            allInput[3].value = data.Mobile;
            allInput[4].value = data.Branch;
            allInput[5].value = data.Year;
            allBtn[0].disabled = false;
            allBtn[1].disabled = true;

            allBtn[0].onclick = () =>{
                allRegData[index] = {
                    Name : allInput[0].value,
                    Enrollment : allInput[1].value,
                    Email : allInput[2].value,
                    Mobile : allInput[3].value,
                    Branch: allInput[4].value,
                    Year : allInput[5].value

                };
                localStorage.setItem("allRegData",JSON.stringify(allRegData));
                swal("Data Updated","successfully!","success");
                closeBtn.click();
                regForm.reset('');
                allBtn[1].disabled = false;
                allBtn[0].disabled = true
                
            };
        };
    };

};
getRegData();

//Delete all Data

delAllBtn.onclick = async() => {
    let isconfirm = await confirm();
    if(isconfirm)
    {
        allRegData = [];
        localStorage.removeItem("allRegData");
        getRegData();
    }
}

// let confirm

const confirm = () => {
    return new Promise((resolve,reject) => {
        swal({
  title : "Are You Sure?",
  text : "Once deleted, you will not be able to recover this imaginary file !",
  icon : "warning",
  buttons : true,
 dangerMode : true,
})
.then((willDelete) => {
   if(willDelete) {
    resolve(true);
    swal("proof ! Your imaginary file has been deleted !",{
     icon : "success",
    });

 } else {
    reject(false);
    swal("Your imaginary file is safe");
            
 }
});
    });

}
    


  // searching data
searchEl.oninput = () => {
    search ();
} 
const search = () => {
    let value = searchEl.value.toLowerCase();
    let tr = regList.querySelectorAll("TR");
    let i;
    for(i=0; i<tr.length; i++)
    {
        let allTd = tr[i].querySelectorAll("TD");
        let Name = allTd[1].innerHTML;
         let Enrollment = allTd[2].innerHTML;
          let Email = allTd[3].innerHTML;
            let Mobile = allTd[4].innerHTML;
        if(Name.toLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else if(Enrollment.toLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else if(Email.toLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else if(Mobile.toLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none"

           }
        }
    



          

       



    }

    

    



