
 const tf = require("@tensorflow/tfjs");
 const fs= require("fs");
 const path = require("path");

//  async function loadModel() {
//    const model = await tf.loadLayersModel("file://./models/model.json");
//    return model;
//  }
class apiController {
  static async predict (req,res) {
      try {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        model.compile({ optimizer: "sgd", loss: "meanSquaredError" });
        // Example data
        const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]); // Features (hours of study)
        const ys = tf.tensor2d([2, 4, 6, 8], [4, 1]); // Labels (exam scores)
        // const xs = tf.tensor2d([1, 2, 3, 4,5,6], [6, 1]); // Features (hours of study)
        // const ys = tf.tensor2d([2, 4, 6, 8,8.2,9], [6, 1]); // Labels (exam scores)
        // const xs = tf.tensor2d([1, 2, 3, 4,5,6, 7, 8, 9], [9, 1]); // Features (hours of study)
        // const ys = tf.tensor2d([2, 4, 6, 8,9,10, 10.5, 12, 14], [9, 1]); // Labels (exam scores)
        // Train the model
         model.fit(xs, ys, { epochs: 100 }).then(() => {
           // Model is trained
           //  model.predict(tf.tensor2d([3], [1, 1])).print();

           let value = parseFloat(req.params.value) || 3;
           const inputTensor = tf.tensor2d([value], [1, 1]);
           const prediction = model.predict(inputTensor);

           prediction
             .array()
             .then((array) => {
               res.send(`Prediction for ${value} is ${array[0][0]}`);
             })
             .catch((error) => {
               res
                 .status(500)
                 .send(`Error making prediction: ${error.message}`);
             });
         });
      } catch (exception) {
        res.status(500).send(exception);
      }

  }
 
  // static async testModel(req,res){
  //     const model = await tf.loadLayersModel("file://./models/model.json");
  //     const { inputs, labels } = loadIrisData();
  //     const { inputTensor, labelTensor } = createTensorData(inputs, labels);

  //     const predictions = model.predict(inputTensor).argMax(-1);
  //     const labelsTensor = labelTensor.argMax(-1);

  //     const accuracy = predictions.equal(labelsTensor).mean().dataSync()[0];

  //     console.log(`Test accuracy: ${(accuracy * 100).toFixed(2)}%`);
    

  //   testModel()
  //     .then(() => {
  //       res.send("Model testing complete.");
  //     })
  //     .catch((error) => {
  //       res.send("Error testing model:", error);
  //     });
  // }
  static async index(req, res) {
    try {
       
      let str = 'Welcome to MLOps!'
      res.send(str);
    } catch (exception) {
      res.status(500).send(exception);
    }
  }

  // static async users(req, res) {
  //   try {
  //     var arr = [
  //       { "user id": 1, firstname: "Joe", lastname: "Bloggs" },
  //       { "user id": 2, firstname: "Simon", lastname: "Peters" },
  //       { "user id": 3, firstname: "Lakshmi", lastname: "Das" },
  //       { "user id": 4, firstname: "Peter", lastname: "Allens" },
  //     ];
  //     res.send(arr);
  //   } catch (exception) {
  //     res.status(500).send(exception);
  //   }
  // }

  // static async userObject(req, res) {
  //   try {
  //     var obj = { id: 1, firstname: "Joe", lastname: "Bloggs" };
  //     res.send(obj);
  //   } catch (exception) {
  //     res.status(500).send(exception);
  //   }
  // }

  // static async welcomeUser(req, res) {
  //   try {
  //     var user = req.query.username;
  //     var str = "Welcome " + user + "!";
  //     res.send(str);
  //   } catch (exception) {
  //     res.status(500).send(exception);
  //   }
  // }

  // static async save(req, res) {
  //   try {
  //     var user = req.body.username;
  //     var str = user + " saved!";
  //     res.send(str);
  //   } catch (exception) {
  //     res.status(500).send(exception);
  //   }
  // }
}

module.exports = apiController;
