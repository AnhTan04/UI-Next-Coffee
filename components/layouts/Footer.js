import { markCurrentScopeAsDynamic } from 'next/dist/server/app-render/dynamic-rendering';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center space-x-4 text-sm text-gray-600">
          <strong> <span>© {currentYear} </span></strong>

          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <strong>Copyright</strong>
          </Link>

          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <strong>by</strong>
          </Link>

          <Link href="mailto:contact@devnews.com" className="hover:text-gray-900">
            <strong>    Roastory Coffees</strong>
          </Link>

          <Link href="/rss" className="hover:text-gray-900">

          </Link>

          <Link href="https://feedly.com/i/add?url=https://devnews.com/rss" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;