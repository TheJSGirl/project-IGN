'use strict';

var baseUrl = 'http://localhost:3000/branches';

// saving data
$('#submit-btn').click(addData);

// function to adding data
function addData(){
    $.post(baseUrl, function(response){
        console.log('myresponse====>', response);
        var tbody = $('#branchTable').find('tbody');
        console.log(tbody);
        
       
        
    });
};


// function to get all the records 
function updateTable() {
    // fetch data from the api 
    $.get(baseUrl, function(response){
        console.log('response ==>', response);
        // append response in the branch table 
            // find the table 
        var tbody = $('#branchTable').find('tbody');
        console.log(tbody);
        
        $(response.data).each(function(index, data){
            //console.log('value ==> ', data);
            $(data).each(function(index2, value){
                console.log('value ==> ', value);
                $(tbody).append(
                    `<tr>
                        <td>${value.BranchCode}</td>
                        <td>${value.BranchName}</td>
                    </tr>`
                );
            });
        });
        
    })
    .fail(function() {
        console.log('err');
    });
};

function saveData() {
     $.post(baseUrl,'', function(response) {
       if(response.status != 'success') {
           return alert('failed to save');
       }
   });
};


$(document).ready(function(){
    console.log( "ready!" );
    // updateTable();
    // var inputs = $('#myform').find('input');
    // console.log('branch==>',inputs);
    // var branchCode = inputs[0].value;
    // console.log('value ==> ', branchCode);

    // var formData = {
    //     BranchCode:branchCode, 
    //     BranchName:branchName
    // };
    var input2 = $('#myForm').find('input')[1];
    var input1 = $('#myForm').find('input')[0];

    $('#myForm').keyup(function(){
        // console.log('running');testing
        if((input1.value != '') && (input2.value != '') || (input1.value <= 3) && (input2.value <=5)){
            $('#submit-btn').removeAttr('disabled');
        }
        else{
            $('#submit-btn').attr('disabled');
            }
    });
    
    $('#myForm').submit(function(e){
        e.preventDefault();
        console.log('form submited');
        saveData();
        updateTable();
    });

    updateTable();
});