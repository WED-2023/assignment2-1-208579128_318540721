<template>
    <b-container class="my-5">
      <b-row>
        <b-col>
          <b-card class="text-center">
            <b-card-header>
              <h3>About Us</h3>
            </b-card-header>
            <b-card-body>
              <b-img src="https://via.placeholder.com/150" rounded class="mb-4" alt="Team Image"></b-img>
              <b-card-text>
                <h4>Welcome to RecipeApp!</h4>
                <p>We are a team of passionate software developers and engineers dedicated to creating the best cooking recipes site for you. Here’s a little bit about us:</p>
                <b-row class="justify-content-center">
                  <b-col md="4" class="mb-3">
                    <b-card>
                      <b-card-title>Itay</b-card-title>
                      <b-card-text>
                        Software Programmer, Data Scientist, Data Analyst, QA Engineer, Validation Engineer, Chip Designer, VLSI Engineer, Algorithm Engineer, and more.
                      </b-card-text>
                    </b-card>
                  </b-col>
                  <b-col md="4" class="mb-3">
                    <b-card>
                      <b-card-title>Yuval</b-card-title>
                      <b-card-text>
                        Software Programmer, Data Scientist, Data Analyst, QA Engineer, Validation Engineer, Chip Designer, VLSI Engineer, Algorithm Engineer, and more.
                      </b-card-text>
                    </b-card>
                  </b-col>
                </b-row>
                <p>We are currently studying in Beer Sheva, and this project is our attempt to make cooking more accessible and enjoyable for everyone. We hope you find it useful!</p>
              </b-card-text>
            </b-card-body>
            <b-card-footer>
              <p>Feel free to explore our GitHub repository to see the code and contribute:</p>
              <b-button href="https://github.com/WED-2023/assignment2-1-208579128_318540721" target="_blank" variant="primary">Visit our GitHub</b-button>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  export default {
    name: "About"
  };
  </script>
  
  <style scoped>
  .my-5 {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  b-card-header {
    background-color: #007bff;
    color: white;
  }
  b-card-title {
    font-size: 1.5rem;
    color: #007bff;
  }
  b-card-text {
    text-align: left;
  }
  b-card-footer {
    background-color: #f8f9fa;
    text-align: center;
  }
  </style>
  