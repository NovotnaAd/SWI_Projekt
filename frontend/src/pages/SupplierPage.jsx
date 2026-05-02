import { useEffect, useState } from "react";
import { API_BASE_URL } from '../apiConfig';
import "./SupplierPage.css";

function SupplierPage() {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortDir, setSortDir] = useState("asc");

    useEffect(() => {
        fetch(`${API_BASE_URL}/suppliers`)
            .then(res => res.json())
            .then(data => setSuppliers(data))
            .catch(err => console.error(err));
    }, []);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortDir(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortDir("asc");
        }
    };

    const filtered = suppliers
        .filter(s =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase()) ||
            s.address.toLowerCase().includes(search.toLowerCase()) ||
            s.ico.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const valA = a[sortBy]?.toLowerCase() || "";
            const valB = b[sortBy]?.toLowerCase() || "";
            if (valA < valB) return sortDir === "asc" ? -1 : 1;
            if (valA > valB) return sortDir === "asc" ? 1 : -1;
            return 0;
        });

    const arrow = (col) => {
        if (sortBy !== col) return " ↕";
        return sortDir === "asc" ? " ↑" : " ↓";
    };

    return (
        <div className="supplier-page">
            <h1 className="supplier-title">Dodavatelé</h1>

            <div className="supplier-search">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Hledat dodavatele..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filtered.length === 0 && (
                <p className="supplier-empty">Žádní dodavatelé nenalezeni</p>
            )}

            <div className="table-responsive">
                <table className="table supplier-table">
                    <thead>
                    <tr>
                        <th onClick={() => handleSort("name")}>
                            Název{arrow("name")}
                        </th>
                        <th onClick={() => handleSort("email")}>
                            Email{arrow("email")}
                        </th>
                        <th onClick={() => handleSort("ico")}>
                            IČO{arrow("ico")}
                        </th>
                        <th onClick={() => handleSort("address")}>
                            Adresa{arrow("address")}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.ico}</td>
                            <td>{supplier.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SupplierPage;