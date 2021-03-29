var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'db4d1nl04bht2',
    user: 'hrbvniwavnbnmw',
    password: 'd253a2cc4cafb52e8b3840827724abb92ab1fdb803d5bdc469ec7cb8993bb627'
    }
    }
    
    var connectionString = "postgres://hrbvniwavnbnmw:d253a2cc4cafb52e8b3840827724abb92ab1fdb803d5bdc469ec7cb8993bb627@ec2-52-209-134-160.eu-west-1.compute.amazonaws.com:5432/db4d1nl04bht2";
    if (process.env.NODE_ENV == 'production') {
        //Production mode
        if (process.env.DATABASE_URL) {
        developmentDatabase =
        parseConnectionString(process.env.DATABASE_URL);
        } else {
        console.log("process.env.DATABASE_URL empty, connectionString.variable used");
        developmentDatabase = parseConnectionString(connectionString);
        }
        }else{
        //Development mode
        developmentDatabase = parseConnectionString(connectionString);
        }
        function parseConnectionString(connectionString) {
        if (connectionString) {
        var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
        var match = myRegexp.exec(connectionString);
        if (match.length == 6) {
        developmentDatabase.postgres.user = match[1];
        developmentDatabase.postgres.password = match[2];
        developmentDatabase.postgres.host = match[3];
        developmentDatabase.postgres.port = Number(match[4]);
        developmentDatabase.postgres.database = match[5];
        developmentDatabase.postgres.ssl = true;
        return developmentDatabase;
        }
        }
        console.log("connectionString cannot be parsed");
        return null;
        }
        module.exports = {
        hostname: "http://localhost",
        port: 5656,
        database: {
        postgres: developmentDatabase.postgres
        }
        }