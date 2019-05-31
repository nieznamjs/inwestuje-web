pipeline {
    options {
        disableConcurrentBuilds()
    }

    agent none

    stages {
        stage('Build and Test') {
            agent {
                docker { image 'weboaks/node-karma-protractor-chrome:alpine' }
            }
            environment {
              HOME='.'
            }
            stages {
                stage('Build') {
                    steps {
                        sh 'npm install'
                    }
                }
                stage('Test') {
                    steps {
                        sh 'npm run test:ci'
                    }
                }
            }
        }

      stage('Push and deploy image') {
        agent any
        environment {
          AWS_ACCESS_KEY_ID = credentials('aws-access-key')
          AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
          AWS_REGION = credentials('aws-region')
          DB_PASSWORD = credentials('dev-db-password')
          DB_HOST = credentials('dev-db-host')
          DB_USERNAME = credentials('dev-db-username')
          DB_NAME = credentials('dev-db-name')
          SECRET = credentials('dev-secret')
        }
        when {
            branch 'master'
        }
        stages {
          stage('Push image') {
            steps {
              sh 'docker image prune -a -f'
              sh 'docker container prune -f'
              sh 'docker build -t inwestuje-web .'
              sh '\$(/var/lib/jenkins/.local/bin/aws ecr get-login --region ${AWS_REGION} --no-include-email)'
              sh 'docker tag inwestuje-web:latest 130063139515.dkr.ecr.eu-west-1.amazonaws.com/inwestuje-web:latest'
              sh 'docker push 130063139515.dkr.ecr.eu-west-1.amazonaws.com/inwestuje-web'
            }
          }
          stage('Deploy image') {
            steps {
              sh 'ssh jenkins@inwestuje-dev.deftcode.pl " \\$( AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}  /snap/bin/aws ecr get-login --region ${AWS_REGION} --no-include-email)"'
              sh 'ssh jenkins@inwestuje-dev.deftcode.pl "cd ./app && git pull && docker-compose stop && docker-compose rm -f && docker-compose pull"'
              sh 'ssh jenkins@inwestuje-dev.deftcode.pl "cd ./app && DB_PASSWORD=${DB_PASSWORD} DB_HOST=${DB_HOST} DB_USERNAME=${DB_USERNAME} DB_NAME=${DB_NAME} SECRET=${SECRET} AWS_ACCESS_KEY=${AWS_ACCESS_KEY} AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} AWS_REGION=${AWS_REGION} NODE_ENV=development docker-compose up -d --build"'
            }
          }
        }
      }
    }

  post {
    success {
      mattermostSend color: "#42f44e", message: "Build succeeded #${env.BUILD_NUMBER} - ${env.JOB_NAME} (<${env.BUILD_URL}|Open>)"
    }
    failure {
      mattermostSend color: "#f44b42", message: "Build failed #${env.BUILD_NUMBER} - ${env.JOB_NAME} (<${env.BUILD_URL}|Open>)"
    }
  }
}
