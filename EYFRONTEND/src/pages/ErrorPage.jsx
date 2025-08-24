import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
return (
    <>
        <div className="container mt-5 text-center">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-1 text-danger">404</h1>
                    <h2 className="mb-4">Oops! Page Not Found</h2>
                    <p className="lead mb-4">
                        Sorry, the page you are looking for doesn't exist or has been moved.
                    </p>
                    <div className="mb-4">
                        <svg width="200" height="200" viewBox="0 0 200 200" className="text-muted">
                            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="75" cy="85" r="8" fill="currentColor"/>
                            <circle cx="125" cy="85" r="8" fill="currentColor"/>
                            <path d="M 70 130 Q 100 150 130 130" stroke="currentColor" strokeWidth="3" fill="none"/>
                        </svg>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <Link to="/" className="btn btn-primary btn-lg me-md-2">
                            <i className="fas fa-home me-2"></i>
                            Go Back Home
                        </Link>
                        <Link to="/contact" className="btn btn-outline-secondary btn-lg">
                            <i className="fas fa-envelope me-2"></i>
                            Contact Support
                        </Link>
                    </div>
                    <div className="mt-4">
                        <p className="text-muted">
                            If you believe this is an error, please contact our support team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}
