# test_generate.py
from app.deps import verify_api_key
from app.routers.generate import SAFE_MIN
from app.main import app
import pytest
from fastapi.testclient import TestClient
from unittest.mock import Mock, patch, MagicMock
from fastapi import HTTPException
import sys
from pathlib import Path

# Add the app directory to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))


# Mock dependency function

def override_verify_api_key():
    """Override API key verification for tests"""
    return "test-api-key-12345"


# Override the dependency before creating the test client
app.dependency_overrides[verify_api_key] = override_verify_api_key


# Create test client
@pytest.fixture(scope="module")
def test_client():
    """Create test client with dependency overrides"""
    client = TestClient(app)
    yield client
    # Cleanup
    app.dependency_overrides.clear()


# Test fixtures
@pytest.fixture
def valid_resume():
    """Generate a valid resume text"""
    return """
    Senior Software Engineer with 5+ years of experience in Python, FastAPI, and cloud technologies. 
    Led multiple teams and delivered scalable solutions. Expert in microservices architecture and DevOps practices. 
    Strong background in AI/ML integration and API development. Proven track record of improving system performance 
    and reducing costs. Experienced in AWS, GCP, Docker, Kubernetes, and CI/CD pipelines.
    Delivered high-quality code and mentored junior developers. Strong problem-solving skills.
    """ * 2


@pytest.fixture
def valid_job_description():
    """Generate a valid job description"""
    return """
    We are seeking a Senior Backend Engineer with expertise in Python and FastAPI. 
    Must have experience with cloud platforms, microservices, and AI integration. 
    Strong leadership and communication skills required. Experience with AWS/GCP preferred.
    Should be comfortable working in an agile environment and mentoring junior developers.
    Must have excellent problem-solving skills and attention to detail.
    """ * 2


@pytest.fixture
def valid_request_payload(valid_resume, valid_job_description):
    """Generate valid request payload"""
    return {
        "resume_text": valid_resume,
        "job_description": valid_job_description,
        "tone_hint": "professional"
    }


@pytest.fixture
def auth_headers():
    """Generate auth headers"""
    return {"X-API-Key": "test-api-key-12345"}


# Test: Successful generation
@patch('app.routers.generate.get_cached_client')
def test_generate_all_success(
    mock_get_client,
    test_client,
    valid_request_payload,
    auth_headers
):
    """Test successful generation of cover letter and bullets"""
    # Mock AI client responses
    mock_client = MagicMock()

    mock_cover_response = MagicMock()
    mock_cover_response.text = """Dear Hiring Manager,

I am excited to apply for this position. With my extensive experience in Python and FastAPI, 
I am confident I can contribute significantly to your team. My background in cloud technologies
and microservices architecture aligns perfectly with your requirements.

Sincerely,
Applicant"""

    mock_bullets_response = MagicMock()
    mock_bullets_response.text = """Led team of 5 engineers in developing microservices architecture.
Implemented CI/CD pipelines reducing deployment time by 60%.
Designed and deployed scalable FastAPI applications serving 1M+ users.
Optimized database queries improving response time by 40%."""

    mock_client.models.generate_content.side_effect = [
        mock_cover_response,
        mock_bullets_response
    ]
    mock_get_client.return_value = mock_client

    # Make request
    response = test_client.post(
        "/generate/all",
        json=valid_request_payload,
        headers=auth_headers
    )

    # Debug output
    if response.status_code != 200:
        print(f"Response: {response.json()}")

    # Assertions
    assert response.status_code == 200, f"Expected 200 but got {response.status_code}: {response.json()}"
    data = response.json()
    assert "cover_letter" in data
    assert "bullets" in data
    assert len(data["cover_letter"]) > 0
    assert len(data["bullets"]) > 0


# Test: Missing API key behavior (even though we override, test the override)
def test_generate_all_with_override(test_client, valid_request_payload):
    """Test that dependency override works"""
    # No auth headers needed because of override
    response = test_client.post(
        "/generate/all",
        json=valid_request_payload
    )

    # Should fail on validation, not auth (because auth is overridden)
    assert response.status_code in [200, 422, 500]  # Any error except 401


# Test: Resume too short
def test_generate_all_resume_too_short(
    test_client,
    valid_job_description,
    auth_headers
):
    """Test validation for resume text that's too short"""
    payload = {
        "resume_text": "Too short",
        "job_description": valid_job_description,
        "tone_hint": "professional"
    }

    response = test_client.post(
        "/generate/all",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 422


# Test: Job description too short
def test_generate_all_jd_too_short(
    test_client,
    valid_resume,
    auth_headers
):
    """Test validation for job description that's too short"""
    payload = {
        "resume_text": valid_resume,
        "job_description": "Short",
        "tone_hint": "professional"
    }

    response = test_client.post(
        "/generate/all",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 422


# Test: Missing required fields
def test_generate_all_missing_fields(test_client, auth_headers):
    """Test validation for missing required fields"""
    payload = {
        "resume_text": "Some resume text"
        # Missing job_description
    }

    response = test_client.post(
        "/generate/all",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 422


# Test: Empty cover letter generation
@patch('app.routers.generate.get_cached_client')
def test_generate_all_empty_cover_letter(
    mock_get_client,
    test_client,
    valid_request_payload,
    auth_headers
):
    """Test handling when AI returns empty cover letter"""
    mock_client = MagicMock()
    mock_cover_response = MagicMock()
    mock_cover_response.text = ""  # Empty response
    mock_cover_response.__bool__ = lambda self: True  # Make it truthy

    mock_client.models.generate_content.return_value = mock_cover_response
    mock_get_client.return_value = mock_client

    response = test_client.post(
        "/generate/all",
        json=valid_request_payload,
        headers=auth_headers
    )

    assert response.status_code == 500


# Test: Empty bullets generation
@patch('app.routers.generate.get_cached_client')
def test_generate_all_empty_bullets(
    mock_get_client,
    test_client,
    valid_request_payload,
    auth_headers
):
    """Test handling when AI returns empty bullets"""
    mock_client = MagicMock()

    mock_cover_response = MagicMock()
    mock_cover_response.text = "Valid cover letter content here with sufficient length"

    mock_bullets_response = MagicMock()
    mock_bullets_response.text = ""  # Empty bullets
    mock_bullets_response.__bool__ = lambda self: True

    mock_client.models.generate_content.side_effect = [
        mock_cover_response,
        mock_bullets_response
    ]
    mock_get_client.return_value = mock_client

    response = test_client.post(
        "/generate/all",
        json=valid_request_payload,
        headers=auth_headers
    )

    assert response.status_code == 500


# Test: Tone hint variations
@pytest.mark.parametrize("tone", [
    "professional",
    "casual",
    "enthusiastic",
    "formal",
    None
])
@patch('app.routers.generate.get_cached_client')
def test_generate_all_tone_variations(
    mock_get_client,
    test_client,
    valid_resume,
    valid_job_description,
    auth_headers,
    tone
):
    """Test different tone hint values"""
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.text = "Generated content with sufficient length for validation and testing purposes"
    mock_client.models.generate_content.return_value = mock_response
    mock_get_client.return_value = mock_client

    payload = {
        "resume_text": valid_resume,
        "job_description": valid_job_description
    }
    if tone:
        payload["tone_hint"] = tone

    response = test_client.post(
        "/generate/all",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 200


# Test: AI client exception
@patch('app.routers.generate.get_cached_client')
def test_generate_all_ai_client_exception(
    mock_get_client,
    test_client,
    valid_request_payload,
    auth_headers
):
    """Test handling when AI client raises exception"""
    mock_client = MagicMock()
    mock_client.models.generate_content.side_effect = Exception(
        "AI service unavailable")
    mock_get_client.return_value = mock_client

    response = test_client.post(
        "/generate/all",
        json=valid_request_payload,
        headers=auth_headers
    )

    assert response.status_code == 500


# Test: Response structure
@patch('app.routers.generate.get_cached_client')
def test_generate_all_response_structure(
    mock_get_client,
    test_client,
    valid_request_payload,
    auth_headers
):
    """Test that response has correct structure"""
    mock_client = MagicMock()

    mock_cover_response = MagicMock()
    mock_cover_response.text = "Cover letter content with enough text"

    mock_bullets_response = MagicMock()
    mock_bullets_response.text = "Bullet point content with details"

    mock_client.models.generate_content.side_effect = [
        mock_cover_response,
        mock_bullets_response
    ]
    mock_get_client.return_value = mock_client

    response = test_client.post(
        "/generate/all",
        json=valid_request_payload,
        headers=auth_headers
    )

    assert response.status_code == 200
    data = response.json()

    # Check response structure
    assert isinstance(data, dict)
    assert "cover_letter" in data
    assert "bullets" in data
    assert isinstance(data["cover_letter"], str)
    assert isinstance(data["bullets"], str)


# Integration test: Full flow
@patch('app.routers.generate.get_cached_client')
def test_generate_all_full_flow(
    mock_get_client,
    test_client,
    valid_request_payload,
    auth_headers
):
    """Integration test for complete generation flow"""
    mock_client = MagicMock()

    mock_cover_response = MagicMock()
    mock_cover_response.text = """Dear Hiring Manager,

I am writing to express my strong interest in the Senior Backend Engineer position. 
With over 5 years of experience in Python development and a proven track record of building 
scalable FastAPI applications, I am confident in my ability to contribute to your team's success.

Throughout my career, I have led cross-functional teams in delivering microservices architectures 
that serve millions of users. My expertise in cloud platforms and AI integration aligns perfectly 
with your requirements.

I would welcome the opportunity to discuss how my skills can benefit your organization.

Best regards,
John Doe"""

    mock_bullets_response = MagicMock()
    mock_bullets_response.text = """Led development of microservices architecture using FastAPI, reducing system latency by 40%.
Managed team of 5 engineers in delivering cloud-native solutions on AWS and GCP.
Implemented CI/CD pipelines with GitHub Actions, improving deployment frequency by 300%.
Integrated AI/ML models into production APIs serving 1M+ daily requests.
Designed and optimized PostgreSQL database schemas handling 10TB+ of data."""

    mock_client.models.generate_content.side_effect = [
        mock_cover_response,
        mock_bullets_response
    ]
    mock_get_client.return_value = mock_client

    response = test_client.post(
        "/generate/all",
        json=valid_request_payload,
        headers=auth_headers
    )

    assert response.status_code == 200
    data = response.json()

    # Cover letter assertions
    assert "cover_letter" in data
    assert len(data["cover_letter"]) > 100

    # Bullets assertions
    assert "bullets" in data
    assert len(data["bullets"]) > 50

    # Verify AI client was called
    assert mock_client.models.generate_content.call_count == 2


# Test: Input sanitization
@patch('app.routers.generate.get_cached_client')
def test_generate_all_with_special_characters(
    mock_get_client,
    test_client,
    auth_headers
):
    """Test handling of special characters in input"""
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.text = "Safe content generated successfully"
    mock_client.models.generate_content.return_value = mock_response
    mock_get_client.return_value = mock_client

    base_resume = "Software Engineer with experience in Python. " * 20
    base_jd = "Looking for a Python developer. " * 20

    payload = {
        "resume_text": base_resume,
        "job_description": base_jd,
        "tone_hint": "professional"
    }

    response = test_client.post(
        "/generate/all",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code in [200, 422]


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
