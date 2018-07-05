var env = process.env.NODE_ENV || 'development';

if(env !== 'test' && env !== 'development'){
    env = "development";
    process.end.NODE_ENV = env;
}

if(env === 'test' && process.env.MONGODB_URI){
    process.env.MONGODB_URI = process.env.MONGODB_URI_TEST
} else if(!process.env.MONGODB_URI && env === 'test'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if(!process.env.MONGODB_URI){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}

console.log(`Application started on Environment ${env}`);

/*
if(env === 'development'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}*/
