pipeline {
  agent any

  options {
    timeout(time: 10, unit: 'MINUTES')
  }

  environment {
    ARTIFACT_ID = "jose0112luis/financesystem:${env.BUILD_NUMBER}"
  }

  stages {
    stage('Build') {
      steps {
        script {
          dockerImage = docker.build "${env.ARTIFACT_ID}"
        }
      }
    }

    stage('Login to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'DockerHubTest', usernameVariable:  'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
        }
      }
    }

    stage('Publish to Docker Hub') {
      steps {
        script {
            dockerImage.push()
        }
      }
    }
  }
}
