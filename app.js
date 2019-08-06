const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

const todos = [{
    id: 1,
    name: '李白',
    sex:"男",
    position:"刺客"
  },
  {
    id: 2,
    name: '小乔',
    sex:"女",
    position:"刺客"
  },
  {
    id: 3,
    name: '妲己',
    sex:"女",
    position:"刺客"
  },
]

// 增删改查 todos
// 表意性
// GET /todos 获取所有的 todos
// POST /todos 添加一个 todo
// PATCH /todos/:todoId 更新指定的 todo
// DELETE /todos/:todoId

app
  .get('/todos', (req, res) => {
    res.json(todos)
  })
  .post('/todos', (req, res) => {
    const todo = {
      id: todos[todos.length - 1].id + 1,
      name: req.body.name,
      sex:req.body.sex,
      position:req.body.position
    }
    todos.push(todo)
    res.json(todo)
  })
  .patch('/todos/:todoId', (req, res) => {

  })
  .delete('/todos/:todoId', (req, res) => {
    for(var i=0;i<todos.length;i++){
      if(todos[i].id == req.id){
        todos.splice(i,1);
        break;
      }
    }
  })
  .get('/todos/hero_type', (req,res) => {
    const position = ["坦克","战士","刺客","法师","辅助","射手"];
    const positionData = [];
    for(var i=0;i<position.length;i++){
      positionData.push({id:i+1,name:position[i]})
    }
    res.json(positionData)
    
  })
  
  //登陆验证
  app.post('/api/login',(req,res)=>{
    console.log(req.body)
    if(req.body.username == "admin" && req.body.password == "123456"){
      res.json(req.body)
    }else{
      res.json("用户名或密码不正确");
    }
    

  })

  const port = 3000;
app.listen(port, () => console.log('api server running '+port+' ...'))
