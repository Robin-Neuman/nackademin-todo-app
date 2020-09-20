switch (ENVIRONMENT) {
    case "development":
        window.CONFIG = {
            host: "http://localhost:3006"
        }
    break;

    case "staging":
        window.CONFIG = {
            host: "https://todo-app-robin.herokuapp.com"
        }
}