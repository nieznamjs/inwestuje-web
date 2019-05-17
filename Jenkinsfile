pipeline {
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
        }
        stages {
          stage('Push image') {
            steps {
              sh 'docker image prune -a -f'
              sh 'docker build -t inwestuje-web .'
              sh '\$(/var/lib/jenkins/.local/bin/aws ecr get-login --region eu-west-1 --no-include-email)'
              sh 'docker tag inwestuje-web:latest 130063139515.dkr.ecr.eu-west-1.amazonaws.com/inwestuje-web:latest'
              sh 'docker push 130063139515.dkr.ecr.eu-west-1.amazonaws.com/inwestuje-web'
            }
          }
          stage('Deploy image') {
            steps {
              sh 'ssh jenkins@inwestuje-dev.deftcode.pl " \\$( AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}  /snap/bin/aws ecr get-login --region eu-west-1 --no-include-email)"'
              sh 'ssh jenkins@inwestuje-dev.deftcode.pl "cd ./app && git pull && docker-compose stop && docker-compose rm -f && docker-compose pull && docker-compose up -d --build"'
            }
          }
        }
      }
    }
}
