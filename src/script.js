'use strict';


function displayResults(response){
    
    let responseHTML = [];

    $('.search-results').empty();

    response.forEach((userRepo, index) => {
        responseHTML.push(`
            <div class='repo'>
                <h4>${index+1}. ${userRepo.name}</h4>
                <p>
                    <a href='${userRepo.html_url}'>
                        Repo Link
                    </a>
                </p>
            </div>
        `);
      });

      $(".search-results").html(responseHTML.join(' '));

}

function fetchUserRepos(fetchURL){
    return fetch(fetchURL)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            alert('Cannot Fint Github UserName')
            console.log(error.message);
        });
}

function getFetchURL(userName){
    return `https://api.github.com/users/${userName}/repos`;
}

function getUserInput(){
    return $('.github-username').val();
}

function watchForm(){

    $('form').on('submit', function (e) {
        
        e.preventDefault();

        const userName = getUserInput();
        const fetchURL = getFetchURL(userName);
        console.log(fetchURL);
        fetchUserRepos(fetchURL);

    })

}

$(watchForm);