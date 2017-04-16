'use strict';

var baseUrl = 'http://localhost:3000/branches';

var updateSuccessFunction = function(response){
        // console.log('response ==>', response);

        if(response.status != 'success'){
            return alert('fail to get data');
        }
        // append response in the branch table 
            // find the table 
        var tbody = $('#branchTable').find('tbody');
        // console.log(tbody);

        var rows = '';
        
        $(response.data).each(function(index, data){
            //console.log('value ==> ', data);
            $(data).each(function(index2, value){
                // console.log('value ==> ', value);
                rows +=`<tr>
                        <td>${value.BranchCode}</td>
                        <td>${value.BranchName}</td>
                    </tr>`;
            });
        });
        // console.log(rows);
        $(tbody).html(rows);
        
};


// function to get all the records 
function updateTable() {
    
    ajaxWrapper('GET', baseUrl, null,  updateSuccessFunction, function() {
        return console.log('failed to get data');
    }, function(){
       
    });
};

var saveDataFunction  = function(response) {
    console.log(response);

    if(response.status != 'success') {
        return console.log(response.message);
    }
    else{
        return alert('data saved');
    }   
}

function saveData(data) {
    ajaxWrapper('POST', baseUrl, data, saveDataFunction, function(response){
        //alert(JSON.parse(response.responseText).message);
        return console.log(response);
        
    }, function(){
        updateTable();
    });
};

function ajaxWrapper(reqType, reqURL, data,successCBFunction, errFunction, reqCompleteFunction){
    $.ajax({
        type:reqType,
        url:reqURL,
        data:data,
        success:successCBFunction,
        error:errFunction,
        complete : reqCompleteFunction,
        statusCode: {
            404: function() {
                return alert( "page not found" );
            },
            
            422 : function(){
                return alert('wrong parameters');
            }
        }
    });
};


$(document).ready(function(){
    console.log( "ready!" );

    var input1 = $('#myForm').find('input')[0];
    var input2 = $('#myForm').find('input')[1];

    $(input1).change(function(){
        if($(input1).val().length == 3 && $(input2).val() != '') {
            $('#submit-btn').prop('disabled', false);
        }
        else {
            $('#submit-btn').prop('disabled', true);
        }
    });

    $(input2).change(function(){
        if($(input1).val().length == 3 && $(input2).val() != '') {
            $('#submit-btn').prop('disabled', false);
        }
        else {
            $('#submit-btn').prop('disabled', true);
        }
    });
    
    $('#submit-btn').click(function(e){
        var data = {
            branchCode : $(input1).val(),
            branchName : $(input2).val()
        }

        // console.log(data);

        e.preventDefault();

        console.log('form submited');
        saveData(data);
        
    });

    updateTable();
});