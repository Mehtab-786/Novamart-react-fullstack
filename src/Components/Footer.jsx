function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 mt-8">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} BharatMart. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer