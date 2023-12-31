const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // Use findAll to get productData and include category and tag data for each product
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }]
    });
    // If successful, 200 status code is sent back with productData as json response
    res.status(200).json(productData);
  } catch (err) {
    // If error, 500 status code is sent back
    res.status(500).json(err)
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // Use findByPk to find single product based on its id
    const productData = await Product.findByPk(req.params.id, {
      // Include option to include associated category and tag data for the product
      include: [{ model: Category }, { model: Tag }]
    });
    // Check to see if product exists
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    // If product is found 200 response is display along with json response of productData
    res.status(200).json(productData);
  } catch (err) {
    // If error, display 500 response
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    // Assuming req.body contains the data for the new product
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating product.' });
  }
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    // Use destroy method to delete the product
    const productData = await Product.destroy({
      // Find product by id
      where: {
        id: req.params.id
      }
    });
    // Check to see if product id exists
    if(!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    // Successful deletion
    res.status(200).json(productData);
  } catch (err) {
    // Catch error and display 500 response
    res.status(500).json(err);
  }
});

module.exports = router;
