export function schemaProduct({ name, image } = {}) {
  return {
    product: {
      title: (name) ? name : 'Automated Product',
      body_html: `<p class="p1">\
                  Congratulations, you’ve chosen a personalized location! \
                  It will always be displayed as “black” land with “white” waterways. \
                  Choose your options, add to cart and you're finished! \
                  </p>\n\
                  <p> \
                  <p class="p1"><strong>Material</strong><span> : Clear cast acrylic</span></p>\n\
                  <p><strong>Process</strong> : Reverse Laser Etched </p>\n\
                  <p><strong>Sizing Options : Medium</strong> [18" x 24" ] or <strong>Large</strong> [ 24" x 36" ] or <strong>XL</strong> [ 36" x 48" ]</p>\n\
                  <p><strong>Lighting : </strong>Low energy LED thin profile panel | 50, 000 LED hours </p>\n\
                  <p><strong>Weight</strong> : Approximately 6 lbs </p>\n\
                  <p><strong>Recommended Application</strong> : Low cost and energy efficient ambient lighting for any room.</p>\n\
                  <p><strong>Images (SVG) : <a href=${ image }-full.svg>Full</a>, <a href=${ image }-roads.svg>Roads</a>, <a href=${ image }-water.svg>Water</a>, <a href=${ image }-buildings.svg>Buildings</a>
                  <p>Above the fireplace. </p>\n\
                  <p>* Comes standard with a North American outlet plug, other options are available upon request.</p>`,
      vendor: 'Krate Labs',
      published: true,
      product_type: 'Automated Illuminated Map',
      tags: 'Custom, Etched, Illuminated, Laser, Laser Cut, Light Panel, Lightbox, Map',
      images: [{ src: `${ image }-full.png` }],
      options: options,
      published_scope: 'global',
      template_suffix: '',
      variants: variants,
    }
  }
}

export const options = [
  { name: 'Size',
    position: 1,
    values: ['Medium', 'Large', 'X-Large']
  },
  { name: 'Material',
    position: 2,
    values: ['Acrylic', 'Photo Film']
  },
  { name: 'Color',
    position: 3,
    values: ['Black', 'White']
  },
]

export const variants = []
let count = 0
const prices = {
  'Photo Film': {
    'Medium': 400,
    'Large': 600,
    'X-Large': 800
  },
  'Acrylic': {
    'Medium': 500,
    'Large': 800,
    'X-Large': 1200
  }
}
options[0].values.map(size => {
  options[1].values.map(material => {
    options[2].values.map(color => {
      count ++
      const price = prices[material][size]
      variants.push({
        title: `${ size } / ${ color } / ${ material }`,
        price: price,
        sku: '',
        position: count,
        grams: 4536,
        inventory_policy: 'deny',
        compare_at_price: null,
        fulfillment_service: 'manual',
        inventory_management: null,
        option1: size,
        option2: material,
        option3: color,
        taxable: true,
        barcode: '',
        image_id: null,
        inventory_quantity: 1,
        weight: 10,
        weight_unit: 'lb',
        old_inventory_quantity: 1,
        requires_shipping: true
      })
    })
  })
})
