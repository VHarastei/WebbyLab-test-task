# How to run

1. To start front-end run following commang: docker run --name movies -p 3000:3000 -e REACT_APP_API_URL=http://localhost:8000/api/v1 vharastei/movies
2. To start back-end run following commang: docker run -dp 8000:8000 webbylabhub/movies
3. Enjoy

# Setup for development with react hot reload

1. Create .env following the example of .env.example
2. Run following command: docker-compose -f docker-compose.dev.yaml up
3. Enjoy
