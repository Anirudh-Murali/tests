$(document).ready(function(){
    $(".button-collapse").sideNav();
    $('.tooltipped').tooltip({delay: 50});
    window.dispatchEvent(new Event('resize'));
    $('ul.tabs').tabs();
});


window.onload = function() {
    homeScreenAPICalls();
}

function goToMainScreen(){
    $('#landingScreen').css('display','none');
    $('#homePage').css('display','block');
}

const serverURL = 'http://192.168.43.120:3000/api/';

function homeScreenAPICalls(){
    $('#loaderDiv').css('display','block');
    getDataforHomePage();
}

// 4 ###############################
function FuncGetCitizenHistory(){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serverURL+"queries/getTokenHistoryCitizen?citizen=resource%3Aorg.EBS.test.Citizen%23C1",
        "method": "GET",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
      }

      $.ajax(settings).done(function (response) {

            if(response){

                $('.pushCitizenDataHere').empty();

                for(var i=0;i<response.length;i++){
                    var timeData = moment(response[i].timestamp).format("dddd, MMM Do YYYY,h:mm:ss a");
                    var utilityCompanyValue  = response[i].utilityCompany.substring(response[i].utilityCompany.indexOf('#')+1);
                    $('.collapsible').collapsible();

                    var chipsDatatoPush = '';

                    for(var j=0;j<response[i].Energy.length;j++){
                        chipsDatatoPush =  chipsDatatoPush + '<div class="chip">' + response[i].Energy[j] + '</div>';
                    }

                    var dataTOpush =   '<div class="card-panel topBar"><div class="row"><div class="col s12 center"> <h5 class="headingHeight baseTypeFontLight">' + timeData +  '</h5> </div> <div class="col s12"> <hr> </div> <div class="col s12"> <table class="bordered centered"> <tbody> <tr class="baseTypeFontExtraLight"> <td>Token Id</td> <td class="baseTypeFontExtraLight">'   + response[i].tokenId + '</td> </tr> <tr > <td class="baseTypeFontExtraLight">Amount</td> <td class="baseTypeFontExtraLight"> Rs '  + response[i].amount + '</td> </tr> <tr> <td class="baseTypeFontExtraLight">Utility Company </td> <td class="baseTypeFontExtraLight">' + utilityCompanyValue + '</td> </tr> </tbody> </table> </div> <div class="col s12"> <br> </div> <div class="col s12 center"> <ul class="collapsible" data-collapsible="accordion"> <li> <div class="collapsible-header baseTypeFontExtraLight" style="justify-content:center;">See Energy tokens Under Conversion <i class="material-icons" style="margin-right: 0px;">arrow_drop_down</i></div> <div class="collapsible-body"> ' + chipsDatatoPush+'</div> </li> </ul> </div> </div> </div>'

                    $('.collapsible').collapsible();

                    $('.pushCitizenDataHere').append(dataTOpush);
                    $('.collapsible').collapsible();

                }

                $('#loaderDiv').css('display','none');
                $('#mainFrame').removeClass("disabledbutton");
                $('#homePage').removeClass('disabledbutton');

            }else{
                Materialize.toast("Unsuccesfull Reqeust", 2000);
            }
      });
}

//  3 ###############################
function FuncGetBankHistory(){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serverURL+"queries/getCreditHistoryCitizen?citizen=resource%3Aorg.EBS.test.Citizen%23C1",
        "method": "GET",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
      }

      $.ajax(settings).done(function (response) {

            if(response){

                $('.pushBankDataHere').empty();

                for(var i=response.length-1;i>=0;i--){
                    var timeData = moment(response[i].timestamp).format("dddd, MMM Do YYYY,h:mm:ss a");
                    var bank  = response[i].bank.substring(response[i].bank.indexOf('#')+1);
                    $('.collapsible').collapsible();

                    var chipsDatatoPush = '';

                    for(var j=0;j<response[i].Token.length;j++){
                        chipsDatatoPush =  chipsDatatoPush + '<div class="chip">' + response[i].Token[j] + '</div>';
                    }

                    var dataTOpush =   '<div class="card-panel topBar"><div class="row"><div class="col s12 center"> <h5 class="headingHeight baseTypeFontLight">' + timeData +  '</h5> </div> <div class="col s12"> <hr> </div> <div class="col s12"> <table class="bordered centered"> <tbody> <tr> <td class="baseTypeFontExtraLight" >Credit Id</td> <td class="baseTypeFontExtraLight">'   + response[i].creditId + '</td> </tr> <tr> <td class="baseTypeFontExtraLight">Amount</td> <td class="baseTypeFontExtraLight"> Rs '  + response[i].amount + '</td> </tr> <tr> <td class="baseTypeFontExtraLight">Conversion Rate </td> <td class="baseTypeFontExtraLight"> Rs '+  response[i].conversionRate +'</td> </tr> <tr> <td class="baseTypeFontExtraLight">Bank </td> <td class="baseTypeFontExtraLight">' + bank + '</td> </tr> </tbody> </table> </div> <div class="col s12"> <br> </div> <div class="col s12 center"> <ul class="collapsible" data-collapsible="accordion"> <li> <div class="collapsible-header baseTypeFontExtraLight style="justify-content:center;">See Credit tokens Under Conversion <i class="material-icons" style="margin-right: 0px;">arrow_drop_down</i></div> <div class="collapsible-body"> ' + chipsDatatoPush+'</div> </li> </ul> </div> </div> </div>'
                    $('.collapsible').collapsible();

                    $('.pushBankDataHere').append(dataTOpush);
                    $('.collapsible').collapsible();

                }

                FuncGetCitizenHistory();

            }else{
                Materialize.toast("Unsuccesfull Reqeust", 2000);
            }
      });

}

function FuncWithdrawalTokens(){

    $('#loaderDiv').css('display','block');
    $('#homePage').addClass('disabledbutton');

    var currentTime = moment().format();
    var creditIDTemp  = moment().format("dddd, MMM Do YYYY,h:mm:ss a");

    var citizenWithdrawalData = {
        "$class": "org.EBS.test.TokenToCredit",
        "creditId": creditIDTemp,
        "rate": 2.5,
        "citizen": "resource:org.EBS.test.Citizen#C1",
        "bank": "resource:org.EBS.test.Bank#B1",
        "transactionId": "",
        "timestamp": currentTime
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serverURL+"TokenToCredit",
        "method": "POST",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
        "data":citizenWithdrawalData
    }

    $.ajax(settings).done(function (response) {
        $('#loaderDiv').css('display','none');
        $('#homePage').removeClass('disabledbutton');
        if(response){
            Materialize.toast("Withdrawal success. Reloading ...", 2000);
            setTimeout(function(){

                $('#homePage').addClass('disabledbutton');
                homeScreenAPICalls();
            },2000);
        }else{
            Materialize.toast("Withdrawal failure", 2000);
        }
    });
}

// 1 ######################
function getDataforHomePage(){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serverURL+"Citizen/C1",
        "method": "GET",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
      }

      $.ajax(settings).done(function (response) {

            if(response){
                $('#totalAmountID')[0].innerHTML= response.inrBalance;
                $('#totalTokenID')[0].innerHTML= response.tokenBalance;
                getDataforHomeGraph();
            }else{
                Materialize.toast("Unsuccesfull Reqeust", 2000);
            }
      });
}

// 2 #############################
function getDataforHomeGraph(){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serverURL+"queries/getEnergyHistoryCitizen?citizen=resource%3Aorg.EBS.test.Citizen%23C1",
        "method": "GET",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
      }

      $.ajax(settings).done(function (response) {
            if(response){

                var dataForGraph = {
                    yAxisValue : [],
                    xAxisValue : []
                }

                for(var i=0;i<response.length;i++){
                    var xAxisTemp = moment(response[i].timestamp).format("MMM Do YYYY");
                    var yAxisTemp = response[i].amount;
                    dataForGraph.yAxisValue.push(yAxisTemp);
                    dataForGraph.xAxisValue.push(xAxisTemp);
                }

                graphShowingDaysFunc(dataForGraph);
                FuncGetBankHistory()

            }else{
                Materialize.toast("Unsuccesfull Reqeust", 2000);
            }
      });
}


function graphShowingDaysFunc(serverData){

    Highcharts.chart('graphShowingDays', {

        title: {
            text: 'Energy Generation per Day'
        },

        exporting: { enabled: false },

        yAxis: {
            title: {
                text: 'Energy(Watts)'
            }
        },

        subtitle: {
            text: 'via Solar Power Grid'
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        scrollbar: {
            enabled: true
        },

        xAxis: {
            categories: serverData.xAxisValue
        },

        series: [{
            name: 'Energy (watts)',
            data: serverData.yAxisValue
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}



function doSignUp(){

    loaderShow();

    var usreCredentialObject  = {
        meritNo:$('#input_meritNoSigUp').val(),
        pass:$('#input_passwordSigUp').val(),
        name:$('#input_nameSigUp').val(),
        userName:$('#input_UsernameSigUp').val()
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serverURL+"signUp",
        "method": "POST",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
        "data":usreCredentialObject
      }

      $.ajax(settings).done(function (response) {
        loaderHide();
            if(response.result){
                Materialize.toast(response.output, 2000);

                setTimeout(function(){
                    $('#signUpFrame').css('display','none');
                    $('#secondFrame').css('display','block');
                },2000);

            }else{
                Materialize.toast(response.output, 2000);
            }
      });
}

function loaderShow(){
    $('#loaderDiv').css('display','block');
}

function loaderHide(){
    $('#loaderDiv').css('display','none');
}

function doLogin(){

    loaderShow();

    var usreCredentialObject  = {
        pass:$('#input_passwordLogin').val(),
        userName:$('#input_usernameLogin').val()
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serverURL+"login",
        "method": "POST",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
        "data":usreCredentialObject
    }

    $.ajax(settings).done(function (response) {

        loaderHide();

        if(response.val){
            Materialize.toast("Login Successfull", 2000);

            localStorage.setItem("userName",$('#input_usernameLogin').val());

            setTimeout(function(){
                if(response.output == "Open pay screen"){
                    $('#secondFrame').css('display','none');
                    $('#payScreen').css('display','block');
                }else{
                    $('#secondFrame').css('display','none');
                    $('#alreadyPaidScreen').css('display','block');
                    $('#pushDataHere').empty();

                    var outputArray = response.data;
                    for(var i=0;i<outputArray.length;i++){
                        var timeInFormat = moment(outputArray[i].dateOfTransaction).format("dddd, MMM Do YYYY,h:mm:ss a");
                        var amountPaid = '₹ '+outputArray[i].amount;
                        var fullDataToPush = '<div class="card-panel cardStyle" style="padding-bottom:10px;" > <div class="row" style="margin:0px;"> <div class="col s12"> <center>' + timeInFormat +'</center> </div> <div class="col s12"> <hr> </div> <div class="col s12"> <div class="row flex-div flex-direction-row flex-justify-content-center flex-align-items-center"> <div> Amount Paid - &nbsp; </div> <div>'+ amountPaid+ '</div> </div> </div> </div> </div>';
                        $("#pushDataHere").append(fullDataToPush);
                    }
                }
            },1000);
        }else{
            Materialize.toast(response.output, 2000);
        }
    });
}

function payFees(){

    loaderShow();

    var options = {
        "key": "rzp_test_GzSCAeWtX81Djf",
        "amount": Number($('.displayFees')[0].innerHTML),
        "name": "Cool Pay",
        "description": "College Fees Payment",
        "image": "https://preview.ibb.co/ktzAMV/logo-image.gif",
        "handler": function (response){

            var data = {
                paymentId:response.razorpay_payment_id,
                userName:localStorage.getItem("userName")
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": serverURL+"payFees",
                "method": "POST",
                "headers": {
                  "content-type": "application/x-www-form-urlencoded",
                },
                "data":data
            }

            $.ajax(settings).done(function (response) {

                loaderHide();

                if(response.val){

                    setTimeout(function(){

                        loaderShow();

                        var data = {
                            userName:localStorage.getItem("userName")
                        }

                        var settings = {
                            "async": true,
                            "crossDomain": true,
                            "url": serverURL+"getPaidHistory",
                            "method": "POST",
                            "headers": {
                              "content-type": "application/x-www-form-urlencoded",
                            },
                            "data":data
                        }

                        $.ajax(settings).done(function (response) {
                            loaderHide();
                            $('#payScreen').css('display','none');
                            $('#alreadyPaidScreen').css('display','block');
                            $('#pushDataHere').empty();
                            var outputArray = response.data;
                            for(var i=0;i<outputArray.length;i++){
                                var timeInFormat = moment(outputArray[i].dateOfTransaction).format("dddd, MMM Do YYYY,h:mm:ss a");
                                var amountPaid = outputArray[i].amount;
                                var fullDataToPush = '<div class="card-panel cardStyle" style="padding-bottom:10px;" > <div class="row" style="margin:0px;"> <div class="col s12"> <center>' + timeInFormat +'</center> </div> <div class="col s12"> <hr> </div> <div class="col s12"> <div class="row flex-div flex-direction-row flex-justify-content-center flex-align-items-center"> <div> Amount Paid - &nbsp; </div> <div>'+ amountPaid+ '</div> </div> </div> </div> </div>';
                                $("#pushDataHere").append(fullDataToPush);
                            }

                        });


                    },1000);
                    Materialize.toast(response.output, 2000);
                }else{
                    Materialize.toast(response.output, 2000);
                }
            })

        },
        "theme": {
            "color": "#F37254"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
