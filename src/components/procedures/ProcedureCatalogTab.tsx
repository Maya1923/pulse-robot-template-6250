import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Calendar, 
  Clock, 
  Building,
  Users,
  MapPin,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  Download,
  Edit,
  Filter,
  Building2,
  Scale
} from 'lucide-react';

interface ProcedureCatalogTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddProcedure: () => void;
}

export function ProcedureCatalogTab({ searchTerm, setSearchTerm, onAddProcedure }: ProcedureCatalogTabProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const procedures = [
    {
      id: 1,
      title: "Demande de passeport biométrique",
      category: "Citoyenneté",
      institution: "Ministère de l'Intérieur",
      duration: "15-30 jours",
      steps: 7,
      documents: 5,
      fees: "Gratuit",
      status: "Active",
      lastUpdate: "10/01/2024"
    },
    {
      id: 2,
      title: "Inscription à l'université",
      category: "Éducation",
      institution: "Ministère de l'Enseignement Supérieur",
      duration: "7-15 jours",
      steps: 5,
      documents: 8,
      fees: "Variable",
      status: "Active",
      lastUpdate: "05/01/2024"
    },
    {
      id: 3,
      title: "Création d'une entreprise",
      category: "Commerce",
      institution: "CNRC",
      duration: "3-7 jours",
      steps: 12,
      documents: 10,
      fees: "5000 DA",
      status: "En révision",
      lastUpdate: "02/01/2024"
    },
    {
      id: 4,
      title: "Demande de logement social",
      category: "Logement",
      institution: "APC",
      duration: "30-60 jours",
      steps: 10,
      documents: 12,
      fees: "Gratuit",
      status: "Inactive",
      lastUpdate: "28/12/2023"
    },
    {
      id: 5,
      title: "Renouvellement de carte d'identité",
      category: "Citoyenneté",
      institution: "Ministère de l'Intérieur",
      duration: "10-20 jours",
      steps: 6,
      documents: 4,
      fees: "Gratuit",
      status: "Active",
      lastUpdate: "15/12/2023"
    },
    {
      id: 6,
      title: "Demande de permis de construire",
      category: "Urbanisme",
      institution: "APC",
      duration: "60-90 jours",
      steps: 15,
      documents: 15,
      fees: "Variable",
      status: "En révision",
      lastUpdate: "01/12/2023"
    }
  ];

  const categories = ["all", "Citoyenneté", "Éducation", "Commerce", "Logement", "Urbanisme"];
  const statuses = ["all", "Active", "Inactive", "En révision"];

  const filteredProcedures = procedures.filter(procedure => {
    const searchMatch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || procedure.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || procedure.status === selectedStatus;
    return searchMatch && categoryMatch && statusMatch;
  });

  const getStatusColor = (status: string, isIcon = false) => {
    if (isIcon) {
      switch (status) {
        case "Active": return "text-green-600";
        case "En révision": return "text-yellow-600";
        case "Inactive": return "text-red-600";
        default: return "text-gray-600";
      }
    } else {
      switch (status) {
        case "Active": return "bg-green-100 text-green-800";
        case "En révision": return "bg-yellow-100 text-yellow-800";
        case "Inactive": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Rechercher une procédure..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="category">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="category">Catégorie</TabsTrigger>
              <TabsTrigger value="status">Statut</TabsTrigger>
            </TabsList>
            <TabsContent value="category" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'Toutes' : category}
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="status" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {statuses.map(status => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status === 'all' ? 'Tous' : status}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Exemples de procédures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProcedures.map((procedure) => (
          <Card key={procedure.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{procedure.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{procedure.category}</Badge>
                    <Badge className={`text-xs ${getStatusColor(procedure.status)}`}>
                      {procedure.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {procedure.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {procedure.duration}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{procedure.steps}</div>
                  <div className="text-xs text-gray-500">étapes</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{procedure.documents}</div>
                  <div className="text-xs text-gray-600">Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{procedure.fees}</div>
                  <div className="text-xs text-gray-600">Frais</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${getStatusColor(procedure.status, true)}`}>
                    {procedure.status === 'Active' ? <CheckCircle className="w-5 h-5 mx-auto" /> : 
                     procedure.status === 'En révision' ? <AlertCircle className="w-5 h-5 mx-auto" /> : 
                     <XCircle className="w-5 h-5 mx-auto" />}
                  </div>
                  <div className="text-xs text-gray-600">Statut</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Mis à jour: {procedure.lastUpdate}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Voir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Institutions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            Institutions
          </CardTitle>
          <CardDescription>
            Principales institutions administratives algériennes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Ministères",
                count: 35,
                icon: <Building2 className="w-6 h-6" />,
                color: "bg-blue-100 text-blue-600",
                examples: ["Ministère de l'Intérieur", "Ministère du Commerce", "Ministère de la Justice"]
              },
              {
                name: "Organismes publics",
                count: 42,
                icon: <Users className="w-6 h-6" />,
                color: "bg-green-100 text-green-600",
                examples: ["CNRC", "CNAS", "CASNOS"]
              },
              {
                name: "Collectivités locales",
                count: 1541,
                icon: <MapPin className="w-6 h-6" />,
                color: "bg-purple-100 text-purple-600",
                examples: ["Wilayas", "APC", "Daïras"]
              }
            ].map((institutionType, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${institutionType.color}`}>
                      {institutionType.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{institutionType.name}</h3>
                      <p className="text-sm text-gray-600">{institutionType.count} institutions</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {institutionType.examples.map((example, i) => (
                      <div key={i} className="text-xs text-gray-500">• {example}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Types de textes juridiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            Types de textes juridiques
          </CardTitle>
          <CardDescription>
            Classifications des différents types de textes juridiques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                type: "Codes",
                count: 25,
                icon: <Scale className="w-5 h-5" />,
                color: "bg-blue-100 text-blue-600",
                examples: ["Code civil", "Code pénal", "Code de commerce"]
              },
              {
                type: "Lois",
                count: 156,
                icon: <FileText className="w-5 h-5" />,
                color: "bg-green-100 text-green-600",
                examples: ["Loi de finances", "Loi électorale", "Loi sur l'investissement"]
              },
              {
                type: "Ordonnances",
                count: 89,
                icon: <FileText className="w-5 h-5" />,
                color: "bg-yellow-100 text-yellow-600",
                examples: ["Ordonnance 75-58", "Ordonnance 03-11", "Ordonnance 96-22"]
              },
              {
                type: "Décrets",
                count: 432,
                icon: <FileText className="w-5 h-5" />,
                color: "bg-purple-100 text-purple-600",
                examples: ["Décrets exécutifs", "Décrets présidentiels", "Décrets législatifs"]
              }
            ].map((textType, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${textType.color}`}>
                      {textType.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{textType.type}</h3>
                      <p className="text-sm text-gray-600">{textType.count} textes</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {textType.examples.map((example, i) => (
                      <div key={i} className="text-xs text-gray-500">• {example}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">457</div>
              <div className="text-sm text-gray-600">Procédures actives</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">123</div>
              <div className="text-sm text-gray-600">Nouvelles procédures</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">89</div>
              <div className="text-sm text-gray-600">En attente de validation</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
