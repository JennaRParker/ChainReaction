# <img src="https://cdn1.iconfinder.com/data/icons/ui-glynh-04-of-5/100/UI_Glyph_08-15-512.png" width="30px">  Chain Reaction  <img src="https://cdn1.iconfinder.com/data/icons/ui-glynh-04-of-5/100/UI_Glyph_08-15-512.png" width="30px">

#### _There are upwards of 40,000 McDonald's according to_ https://www.statista.com/statistics/219454/mcdonalds-restaurants-worldwide/

#### _There are millions of establishments and billions of us. I want to know what YOU order and why! Am I missing out on a life-changing secret sauce hack I should know about? Is there an adjustment to #5 that will rock my world?_

#### Chain Reaction _is an interactive application allowing chain-restaurant-lovers and haters to share in their wisdom of fast-food experiences through the years._

## Technologies Used

* _Mongo DB_
* _Node.js_
* _Npm: Express, Ejs, Method-Override, Mongoose_
* _RESTful Routes_
* _CSS_
* _HTML_

## Getting Started
### Open Chain Reaction https://chain-react.herokuapp.com/

```
<ul class="allofthechains">
        <% chains.forEach(chain=> { %>
            <li>
                <a href="/chainreaction/<%=chain._id; %>">
                    <img src=<%=chain.logo %> width=230px height=230px>
                </a>
                <div class="buttons">
                    <button class="edit">
                        <a href="/chainreaction/<%=chain._id %>/edit" style="text-decoration:none">Edit</a>
                    </button>
                    <form id="delete" action="/chainreaction/<%=chain._id %>?_method=DELETE" method="POST">
                        <input class="delete" type="submit" value="Delete" />
                    </form>
                </div>
                <% }) %>
            </li>
    </ul>
 ```
 
 ![index chainreaction](https://user-images.githubusercontent.com/111609911/190500698-5ceb1ba6-b6c3-4163-b2da-6fe297892231.png)
 
```
app.get('/chainreaction/newchain', (req, res) => {
    res.render('new.ejs')
})
```
![create chainreaction](https://user-images.githubusercontent.com/111609911/190500866-cf8e0b9c-6513-4569-a005-18be2ab1d71e.png)

```
<h1>"CH CH CH CHAIN-GES"</h1>
    <form action="/chainreaction/<%=chain._id%>?_method=PUT" method="POST">
        Name:<input type="text" class="name" name="name" value="<%=chain._name%>" /><br />
        Logo Image URL:<input class="logo" type="text" name="logo" value="<%=chain.logo%>" /><br />
        <input class="submit" type="submit" value="Submit Chain-ges" />
        <input class="reset" type="reset" />
    </form>

    <iframe width="400" height="250" src="https://www.youtube.com/embed/4BgF7Y3q-as" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
```
![edit chainreaction](https://user-images.githubusercontent.com/111609911/190501214-96650373-5a9f-4598-a463-569442652a29.png)

```
<h1>"Can I Take Your <%=menu%> Order at <%=chain.name%> ?"</h1>  
    <form action="/chainreaction/<%=chain._id%>" method="POST">
        Order <input class="order" type="text" name="order" > 
        Rating <input class="range" type="range" name="rating" > <br>
        <br>
        Go Off <textarea name="comment" >This combo changed my life. It's my go-to order.</textarea> 
        <input class="submit" type="submit" value="Order Up" />
        </form>  
```
![new post chainreaction](https://user-images.githubusercontent.com/111609911/190501631-8fca7a20-3111-4caf-b220-c002e0c82537.png)
```
 <% if (menu !==undefined) { %>
        <div class="add">
            <h2>
                <%=menu%>
            </h2>
            <button class="addLink"><a href="/chainreaction/<%=chain._id%>/new?items=<%=menu%>"
                    style="text-decoration:none">Post</a></button>
        </div>

            <ul>
                <% for (i=0; i < chain.reaction.length; i++) { %>

                    <li class="posts">
                        <h3><%=chain.reaction[i].order%> <br>
                        <%=chain.reaction[i].rating%> / 100</h3><br>
                        <p></p><%=chain.reaction[i].comment%></p> <br>
                        <button><a href="/chainreaction/<%=chain._id%>/postedit">Edit Post</a></button>
                    </li>
                    <% } %>
            </ul>
            <% } %>
```
![show page chainreaction](https://user-images.githubusercontent.com/111609911/190502252-b9511bf9-d123-49ba-8441-7c219deec348.png)







