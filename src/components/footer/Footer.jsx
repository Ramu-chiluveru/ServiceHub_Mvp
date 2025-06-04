export default function Footer()
{
  return( 
  <>
    <footer className="bg-white text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} ServiceHub. All rights reserved.
      </footer>
  </>
  );
}