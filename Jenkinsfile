pipeline {
  agent any

  options {
    timeout(time: 2, unit: 'MINUTES')
  }

  environment {
    ARTIFACT_ID = "jose0112luis/financeSystem:${env.BUILD_NUMBER}"
  }

  stages {
    stage('Build') {
      steps {
        script {
          dockerImage = docker.build "${env.ARTIFACT_ID}"
        }
      }
    }

    stage('Test') {
      steps {
        sh "echo ${env.ARTIFACT_ID}"
      }
    }
    // stage('Run tests') {
    //   steps {
    //     sh "docker run ${dockerImage.id} npm test"
    //   } 
    // }

    // stage('Publish') {
    //   when {
    //     branch 'master'
    //   }
    //   steps {
    //     script {
    //       docker.withRegistry("", "DockerHubTest") {
    //         dockerImage.push()
    //       }
    //     }
    //   }
    // }
  }
}
