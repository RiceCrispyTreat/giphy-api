$(document).ready(function () {

    let topics = [];

    function displayGIFS() {

        let x = $(this).data("search");
        console.log(x);

        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=f0h1VIi9wWu5bOo45jCBI1hkto7Xk5VT&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            let results = response.data;
            console.log(results);
            for (let i = 0; i < results.length; i++) {

                let topicDiv = $("<div class='col-md-4'>");

                let rating = results[i].rating;
                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height_still.url;
                let image = $("<img>");
                let p = $("<p>").text("Rating: " + rating);

                image.attr("src", still);
                image.addClass("Giphy");
                image.attr("data-state", "still");
                image.attr("data-still", still);
                image.attr("data-animate", animated);
                topicDiv.append(p);
                topicDiv.append(image);
                $("#gifArea").prepend(topicDiv);

            }
        });
    }

    function displayButtons() {
        $("#myButtons").empty();
        for (let i = 0; i < topics.length; i++) {
            let a = $('<button class="btn btn-light">');
            a.attr("id", "topic");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }

    displayButtons();


    $(document).on("click", "#topic", displayGIFS);


    $(document).on("click", ".Giphy", pausePlayGifs);




    $("#addTopic").on("click", function (event) {
        event.preventDefault();
        let newSearch = $("#Input").val().trim();
        topics.push(newSearch);
        console.log(topics);
        $("#Input").val('');
        displayButtons();
    });


    function pausePlayGifs() {

        $(".gif").on("click", function () {

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    }
});