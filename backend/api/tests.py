from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class EconomyTests(APITestCase):
    def test_get_economy_stats(self):
        """
        Test that the economy endpoint returns data for Kedah.
        Note: This test makes an actual external request if cache is empty.
        """
        url = reverse('economy')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('gdp', response.data)
        self.assertIn('population', response.data)
        self.assertIn('hies', response.data)
        
        # Check if Kedah is indeed the state returned (if data exists)
        if response.data['gdp']:
            self.assertEqual(response.data['gdp']['state'], 'Kedah')
