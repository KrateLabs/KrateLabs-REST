export function schemaProduct({ name, image } = {}) {
  return {
    product: {
      title: (name) ? name : 'Automated Product',
      body_html: `<p class="p1">\
                  Customize a map that is most meaningful to the family by laser \
                  etching the cottage, cabin or summer home location. Hang in the \
                  cottage itself, or at home as a reminder of those moments that \
                  mean so much. </p>\n\
                  <p> \
                  Choose from a variety of symbols to help identify the exact \
                  location on a map, where no one map is similar. \
                  </p>\n<p> \
                  <big>Help your secondary home stand out from the rest. </big></p>\n\
                  <p class="p1"><strong>Material</strong><span> : Clear cast acrylic</span></p>\n\
                  <p><strong>Process</strong> : Reverse Laser Etched </p>\n\
                  <p><strong>Sizing Options : A2</strong> [18" x 24" ] or<strong> A1 </strong>[ 24" x 36" ]</p>\n\
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
    values: ['Medium', 'Large']
  },
  { name: 'Color',
    position: 2,
    values: ['Black', 'White']
  }
]

export const variants = [
  { title: 'Medium / Black',
    price: '450.00',
    sku: '',
    position: 1,
    grams: 4536,
    inventory_policy: 'deny',
    compare_at_price: null,
    fulfillment_service: 'manual',
    inventory_management: null,
    option1: 'Medium',
    option2: 'Black',
    option3: null,
    taxable: true,
    barcode: '',
    image_id: null,
    inventory_quantity: 1,
    weight: 10,
    weight_unit: 'lb',
    old_inventory_quantity: 1,
    requires_shipping: true
  },
  { title: 'Large / Black',
    price: '550.00',
    sku: '',
    position: 2,
    grams: 4536,
    inventory_policy: 'deny',
    compare_at_price: null,
    fulfillment_service: 'manual',
    inventory_management: null,
    option1: 'Large',
    option2: 'Black',
    option3: null,
    taxable: true,
    barcode: '',
    image_id: null,
    inventory_quantity: 1,
    weight: 10,
    weight_unit: 'lb',
    old_inventory_quantity: 1,
    requires_shipping: true
  },
  { title: 'Medium / White',
    price: '450.00',
    sku: '',
    position: 3,
    grams: 4536,
    inventory_policy: 'deny',
    compare_at_price: null,
    fulfillment_service: 'manual',
    inventory_management: null,
    option1: 'Medium',
    option2: 'White',
    option3: null,
    taxable: true,
    barcode: '',
    image_id: null,
    inventory_quantity: 1,
    weight: 10,
    weight_unit: 'lb',
    old_inventory_quantity: 1,
    requires_shipping: true
  },
  { title: 'Large / White',
    price: '550.00',
    sku: '',
    position: 4,
    grams: 4536,
    inventory_policy: 'deny',
    compare_at_price: null,
    fulfillment_service: 'manual',
    inventory_management: null,
    option1: 'Large',
    option2: 'White',
    option3: null,
    taxable: true,
    barcode: '',
    image_id: null,
    inventory_quantity: 1,
    weight: 10,
    weight_unit: 'lb',
    old_inventory_quantity: 1,
    requires_shipping: true
  }
]
