import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Home, Store, PackagePlus, Bike } from "lucide-react";
import { toast } from "sonner";

export default function PedidosRohiApp() {
  const [businesses, setBusinesses] = useState([
    {
      name: "Tienda El Buen Precio",
      products: [
        { name: "Arroz 1kg", price: 35 },
        { name: "Aceite 1L", price: 80 },
        { name: "Desodorante Rexona", price: 55 }
      ]
    },
    {
      name: "Farmacia Santa Fe",
      products: [
        { name: "Panadol", price: 20 },
        { name: "Suero Oral", price: 25 },
        { name: "Alcohol Gel", price: 30 }
      ]
    }
  ]);

  const [motorizedAgents, setMotorizedAgents] = useState(["Luis Mendez", "Carla López", "Juan Pérez"]);

  const [newBusiness, setNewBusiness] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [address, setAddress] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleOrder = () => {
    if (selectedBusiness && selectedProduct && address && selectedAgent) {
      setOrderConfirmed(true);
      toast.success("Pedido confirmado correctamente");
    } else {
      toast.error("Por favor complete todos los campos");
    }
  };

  const handleBusinessRegistration = () => {
    if (newBusiness && newProduct && newPrice) {
      const existing = businesses.find(b => b.name === newBusiness);
      const productObj = { name: newProduct, price: parseFloat(newPrice) };
      if (existing) {
        existing.products.push(productObj);
        setBusinesses([...businesses]);
      } else {
        setBusinesses([...businesses, { name: newBusiness, products: [productObj] }]);
      }
      toast.success("Negocio y producto registrados exitosamente");
      setNewBusiness("");
      setNewProduct("");
      setNewPrice("");
    } else {
      toast.error("Complete todos los campos para registrar el negocio");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <h1 className="text-3xl font-extrabold mb-4 text-center text-blue-800">Pedidos Rohi</h1>
      <p className="text-center mb-6 text-base text-gray-600">
        Plataforma profesional para compras y entregas desde negocios aliados. ¡Rápido y seguro!
      </p>

      <Card className="mb-6 max-w-md mx-auto shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-700">
            <PackagePlus className="w-5 h-5" /> Registro de Negocios Asociados
          </h2>
          <div className="space-y-3">
            <Input placeholder="Nombre del negocio" value={newBusiness} onChange={(e) => setNewBusiness(e.target.value)} />
            <Input placeholder="Producto que ofrece" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
            <Input type="number" placeholder="Precio del producto" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            <Button className="w-full" onClick={handleBusinessRegistration}>
              Registrar negocio y producto
            </Button>
          </div>
        </CardContent>
      </Card>

      {!orderConfirmed ? (
        <div className="grid gap-4 max-w-md mx-auto">
          <Card className="shadow-lg rounded-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Store className="w-4 h-4" /> Selecciona un negocio
                  </label>
                  <select className="w-full mt-1 p-2 border rounded" value={selectedBusiness} onChange={(e) => setSelectedBusiness(e.target.value)}>
                    <option value="">-- Elegir negocio --</option>
                    {businesses.map((b, index) => (
                      <option key={index} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Selecciona producto
                  </label>
                  <select className="w-full mt-1 p-2 border rounded" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} disabled={!selectedBusiness}>
                    <option value="">-- Elegir producto --</option>
                    {businesses.find(b => b.name === selectedBusiness)?.products.map((p, i) => (
                      <option key={i} value={`${p.name} - C$${p.price}`}>{p.name} - C${p.price}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Bike className="w-4 h-4" /> Selecciona agente motorizado
                  </label>
                  <select className="w-full mt-1 p-2 border rounded" value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
                    <option value="">-- Elegir agente --</option>
                    {motorizedAgents.map((a, i) => (
                      <option key={i} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Home className="w-4 h-4" /> Dirección de entrega
                  </label>
                  <Input placeholder="Ej. Barrio San Luis, casa esquinera verde..." value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <Button onClick={handleOrder} className="w-full">
                  Confirmar Pedido
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-lg font-semibold text-green-700">✅ Pedido Confirmado</h2>
          <p className="mt-2 text-gray-600">Nuestro personal lo atenderá y lo llevará a su casa. ¡Gracias por usar Pedidos Rohi!</p>
        </div>
      )}
    </div>
  );
}
