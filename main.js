let records = [];
let editIndex = -1;

function insertData() {
    let fname = document.getElementById("fname").value.trim();
    let mname = document.getElementById("mname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let age = document.getElementById("age").value.trim();

    if(fname=="" || mname== "" || lname=="" || age==""){
        alert("Please fill required fields: First Name, Middle Name, Last Name, Age");
        return;
    }

    let data = {fname, mname, lname, age};

    if(editIndex === -1){
        records.push(data);
    } else {
        records[editIndex] = data;
        editIndex = -1;
    }

    displayData();
    clearForm();
}

function displayData() {
    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    if(records.length === 0){
        table.innerHTML = `<tr><td colspan="5" class="no-records">No Records Found</td></tr>`;
        document.getElementById("saveBtn").style.display="none";
        document.getElementById("clearBtn").style.display="none";
        document.getElementById("sortContainer").style.display="none";
        return;
    }

    document.getElementById("saveBtn").style.display="inline";
    document.getElementById("clearBtn").style.display="inline";
    document.getElementById("sortContainer").style.display="block";

    records.forEach((rec, index)=>{
        table.innerHTML += `
        <tr>
            <td>${rec.fname}</td>
            <td>${rec.mname}</td>
            <td>${rec.lname}</td>
            <td>${rec.age}</td>
            <td>
                <button onclick="editData(${index})">Edit</button>
                <button onclick="deleteData(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function deleteData(index){
    if(confirm("Are you sure you want to delete this record?")){
        records.splice(index,1);
        displayData();
    }
}

function editData(index){
    let rec = records[index];
    document.getElementById("fname").value = rec.fname;
    document.getElementById("mname").value = rec.mname;
    document.getElementById("lname").value = rec.lname;
    document.getElementById("age").value = rec.age;
    editIndex = index;
}

function clearForm(){
    document.getElementById("fname").value="";
    document.getElementById("mname").value="";
    document.getElementById("lname").value="";
    document.getElementById("age").value="";
    editIndex = -1;
}

function saveLocal(){
    localStorage.setItem("records", JSON.stringify(records));
    alert("Records saved to browser!");
}

function clearRecords(){
    if(confirm("Are you sure you want to clear all records?")){
        records = [];
        localStorage.removeItem("records");
        displayData();
    }
}

function sortRecords(){
    let field = document.getElementById("sortField").value;
    let order = document.getElementById("sortOrder").value;

    if(field && order){
        records.sort((a,b)=>{
            let fa = a[field].toLowerCase();
            let fb = b[field].toLowerCase();
            if(order==="az") return fa > fb ? 1 : -1;
            else return fa < fb ? 1 : -1;
        });
        displayData();
    }
}

window.onload = function(){
    let saved = localStorage.getItem("records");
    if(saved){
        records = JSON.parse(saved);
        displayData();
    }
}