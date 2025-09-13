# Movies App

A React-based movie search application that allows users to search for movies and view detailed information using the OMDB API.

## Features

- Search for movies by title
- Display movie search results
- View detailed movie information
- Responsive design
- Fast and intuitive user interface

## ScreenShots
<div align="center">
  <img src="https://i.imgur.com/5rdfn1I.gif" width="500" style="margin: 10px;" />
  <img src="https://i.imgur.com/AJrW3Ot.gif" width="500" style="margin: 10px;" />
  <br>
  <img src="https://i.imgur.com/M4pAl5H.gif" width="500" style="margin: 10px;" />
  <img src="https://i.imgur.com/x9jyNDP.gif" width="500" style="margin: 10px;" />
  <br>
  <img src="https://i.imgur.com/lp255e4.gif" width="500" style="margin: 10px;" />
  <img src="https://i.imgur.com/2S9KP0z.gif" width="500" style="margin: 10px;" />
</div>

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OMDB API key (free from [omdbapi.com](http://www.omdbapi.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/movies-app.git
   cd movies-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```properties
   REACT_APP_BASE_API=http://www.omdbapi.com/
   REACT_APP_API_KEY=your_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**

   Navigate to `http://localhost:3000`

## Configuration

### Getting OMDB API Key

1. Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Sign up for a free account
3. Get your API key
4. Add it to your `.env` file

## Project Structure

```
movies-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.js
├── .env
├── package.json
└── README.md
```

## Built With

- [React](https://reactjs.org/) - Library
- [OMDB API](http://www.omdbapi.com/) - Movie database API
- CSS3 - Styling

## Usage

1. Enter a movie title in the search bar
2. Browse through the search results
3. Click on a movie to view detailed information
4. Enjoy exploring movies!

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for providing the movie data
- React community for the amazing framework
