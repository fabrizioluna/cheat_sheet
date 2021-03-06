import Link                     from "next/link";
import { useEffect, useState }  from "react";
import { httpRequest }          from "../../../helpers/httpRequest";
import { AddCategory }          from "../../add_category";

export const Navigation = () => {

    const [res, setRes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const [ resp ] = await Promise.all([
                httpRequest().get(`${process.env.URL}categories`),
            ]);
            setRes(resp);
          }
    
          fetchData();
    }, []);

    return (
        <div className='homepage'>
            <header>
                <nav>
                <ul>
                    <Link href='/'>
                        <li>CheatSheet Fabrizio</li>
                    </Link>
                    {
                        !!res && res.response.map((category, index) => (
                            <Link key={index} href={`/category/${category.name}`}><li>
                                {category.name.replace(/\b\w/g, l => l.toUpperCase())}
                            </li></Link>
                        ))
                    }
                </ul>
                <AddCategory />
                </nav>
            </header>
        </div>
    )
}