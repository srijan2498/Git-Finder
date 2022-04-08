$(document).ready(function () {
    $('#searchField').on('keyup', function (event) {
        let userName = event.target.value;

        // requesting data from github api
        $.ajax({
            url: 'https://api.github.com/users/' + userName,
            data: {
                client_id: 'b2e40569a4781f2c2352',
                client_secret: 'be953a0d61695ccc0f7859b6ca667d52d2b9f4ef'
            }
        }).done(function (user) {

            $.ajax({
                url: 'https://api.github.com/users/' + userName + '/repos',
                data: {
                    client_id: 'b2e40569a4781f2c2352',
                    client_secret: 'be953a0d61695ccc0f7859b6ca667d52d2b9f4ef'
                }
            }).done(function(repos){
                console.log(repos)
                $.each(repos, function(index, repo){
                    $('#repository').append(`
                    <div class="repoItem">
                        <div class="repo-head">
                            <div class="name">
                                ${repo.name}
                            </div>
                            <div class="lists item">
                                <ul class="points">
                                    <li><span class="green">Forks: ${repo.forks_count}</span></li>
                                    <li><span class="red">Watchers: ${repo.watchers_count}</span></li>
                                    <li><span class="blue">Stars: ${repo.stargazers_count}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="repo-body">
                            <div class="desc">
                                ${repo.description}
                            </div>
                            <button target="_blank" onclick="window.open('${repo.html_url}', '_blank')">Check Out</button>
                        </div>
                    </div>
                    `)
                })
            })

            $('#displayArea').html(
                `<div class="head">
                <h2>${user.name}</h2>
                </div>
                <div class="head">
                <div class="avtar">
                    <img src="${user.avatar_url}" alt="">
                    <button target="_blank" onclick="window.open('${user.html_url}', '_blank')">Visit Profile</button>
                </div>
                <div class="name-visit">
                    <ul class="points">
                        <li><span class="dark">Public Repos: ${user.public_repos}</span></li>
                        <li><span class="green">Public Gists: ${user.public_gists}</span></li>
                        <li><span class="red">Followers: ${user.followers}</span></li>
                        <li><span class="blue">Following: ${user.following}</span></li>
                    </ul>
                    <div class="info">
                        <p>Company: ${user.company}</p>
                        <p>Website/Blog: ${user.blog ? user.blog : "null"}</p>
                        <p>Location: ${user.location}</p>
                        <p>Member Since: ${user.created_at.slice(0, 10)}</p>
                    </div>
                </div>
            </div>
            
            <div class="head">
                <p class="heading repo-head">Latest Repositories</p>
            </div>

            <div class="head">

            <div id="repository"></div>
                
            </div>

            `
            )

        });
    });
});