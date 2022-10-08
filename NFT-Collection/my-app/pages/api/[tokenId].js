export default function handler(req, res) {
    // get the tokenId from the query params
    const tokenId = req.query.tokenId;
    // As all the images are uploaded on github, we can extract the images from github directly.
    const image_url =
      "https://raw.githubusercontent.com/Roysignaler/chaindevs-jpg/main/";
    // The api is sending back metadata for a Crypto Dev
    // To make our collection compatible with Opensea, we need to follow some Metadata standards
    // when sending back the response from the api
    // More info can be found here: https://docs.opensea.io/docs/metadata-standards
    res.status(200).json({
      name: "Chain Dev #" + tokenId,
      description: "Chain Dev is a collection of ITU images for BCC developers",
      image: image_url + "ITU_" + tokenId + ".jpg",
      "attributes": [
        {
          "trait_type": "Base", 
          "value": "Blockchain Developer"
        },
        {
            "trait_type": "University", 
            "value": "IT-University of Copenhagen"
        },
        {
            "trait_type": "Event", 
            "value": "Blockchain Coding Café"
        }, 
        {
          "display_type": "boost_number", 
          "trait_type": "Coding Power", 
          "value": 99
        }, 
        {
          "display_type": "boost_percentage", 
          "trait_type": "Stamina Increase", 
          "value": 5
        }, 
        {
          "display_type": "number", 
          "trait_type": "Generation", 
          "value": 1
        }
      ]
    });
  }
