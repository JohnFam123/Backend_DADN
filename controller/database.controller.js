import { default as mongoose} from 'mongoose'

const uri = "mongodb+srv://root:root@cluster0.64g7nau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function connectDB(){
    await mongoose.connect (uri,).then (() => {
        console.log ('Connected to the database')
      }).catch ((err) => {
        console.log ('Error connecting to the database:', err)
      })

    return mongoose.connection
}

export default connectDB;