const path = require('path');
const fs = require('fs');

module.exports = {
    index: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'productos.json')))
        res.render(path.resolve(__dirname, '..', 'views', 'admin', 'adminProduct'), {productos})
    },
    productAdd1: (req,res)=>{
        let categorias = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'categorias.json')))
        res.render(path.resolve(__dirname, '..', 'views', 'admin', 'productAdd1'),{categorias})
    },
    productAdd2: (req,res)=>{res.render(path.resolve(__dirname, '..', 'views', 'admin', 'productAdd2'))
    },
    productAdd3: (req,res)=>{res.render(path.resolve(__dirname, '..', 'views', 'admin', 'productAdd3'))
    },
    create1: (req,res,next)=>{
        req.session.form1 = {
            sku: req.body.sku,
            nombre: req.body.nombre,
            categoria_id: req.body.categoria_id,
            precio: req.body.precio,
            img_sm: req.files[0].filename,
            img_lg: req.files[1].filename,
            volumen: req.body.volumen,
            descripcion: req.body.descripcion
        };
        res.redirect('/admin/productos/agregar2');
    },
    create2: (req,res)=>{
        req.session.form2 = req.body;
        res.redirect('/admin/productos/agregar3');
    },
    create3: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'productos.json')));
        
        productoNuevo = {
            id: productos[productos.length-1].id + 1,
            sku: req.session.form1.sku,
            nombre: req.session.form1.nombre,
            categoria_id: req.session.form1.categoria_id,
            precio: req.session.form1.precio,
            img_sm: req.session.form1.img_sm,
            img_lg: req.session.form1.img_lg,
            volumen: req.session.form1.volumen,
            descripcion: req.session.form1.descripcion,
            productor: req.session.form2.productor,
            varietal: req.session.form2.varietal,
            corte: req.session.form2.corte,
            cosecha: req.session.form2.cosecha,
            procedencia: req.session.form2.procedencia,
            alcohol: req.session.form2.alcohol,
            elaboracion: req.body.elaboracion,
            crianza: req.body.crianza,
            recomendados: req.body.recomendados,
            ofertas: req.body.ofertas
        };

        productos.push(productoNuevo)

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'productos.json'), JSON.stringify(productos, null, 2));

        res.redirect('/admin/productos');
    },
};

