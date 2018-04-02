// main document ready function to check if dom is loaded fully or not

let myFacebookToken;

$(document).ready(() => {

    myFacebookToken = 'EAACEdEose0cBABZA6yBWkUrOrhIPB4iiND8mDu3sq2mwLZAJmvnOKbqmjIZA8KjTAx9ikMZBbpAYBGD1nfOTtrzpdQrP3DFh6TZB9bbEFgdiqWBzt4BYIzuKQvifsNu9CGBR5RUy99NKnJSqWpv2gT496StnKfOu01xZA3DU6zcBaGY7FzSV777GnmAi4ze5D9q640dMsPXQZDZD';


    getAllDetails();


}); // end document.ready function

let getAllDetails = () => {


    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=name,cover,feed,picture.type(large)&access_token=' + myFacebookToken,

        success: (response) => {

            $('#dataSection').css('display', 'block');

            console.log(response);

            $('#userName').append(response.name);

            $('#profilePhoto').html('<img src="' + response.picture.data.url + '" class="img-fluid profileHeight"/>');

            $('#cover').css('background-image', 'url(' + response.cover.source + ')');

            for(var i=0;i<response.feed.data.length;i++){
                if(response.feed.data[i].hasOwnProperty('story')){
                    $('#feed').append(response.feed.data[i].story+"<br>");
                    $('#feed').append(response.feed.data[i].created_time+"<br>").css('font-weight', 'bold');;   
                }
                else{
                    $('#feed').append(response.feed.data[i].message+"<br>");
                    $('#feed').append(response.feed.data[i].created_time+"<br>").css('font-weight', 'bold');
                 
            }
                }
            



        }, error: (err) => {

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        }

    });// end ajax call 

}